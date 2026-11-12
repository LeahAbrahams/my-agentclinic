#!/usr/bin/env python3
"""Update the root changelog from local Git commits."""

import re
import subprocess
from collections import defaultdict
from datetime import datetime
from pathlib import Path


CHANGELOG = Path("CHANGELOG.md")
HEADING = re.compile(r"^## (\d{4}-\d{2}-\d{2})$")
MARKER = re.compile(r"^<!-- changelog-commit: ([0-9a-f]{40}) -->$")


def read_commits() -> dict[str, list[tuple[str, str]]]:
    result = subprocess.run(
        ["git", "log", "--date=short", "--format=%H%x09%ad%x09%s"],
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    )
    grouped: dict[str, list[tuple[str, str]]] = defaultdict(list)
    for line in result.stdout.splitlines():
        commit, date, subject = line.split("\t", 2)
        grouped[date].append((commit, subject))
    return grouped


def valid_headings(lines: list[str]) -> dict[str, int]:
    headings: dict[str, int] = {}
    for index, line in enumerate(lines):
        match = HEADING.fullmatch(line)
        if match:
            date = match.group(1)
            datetime.strptime(date, "%Y-%m-%d")
            headings[date] = index
    return headings


def entry_lines(entries: list[tuple[str, str]]) -> list[str]:
    lines: list[str] = []
    for commit, subject in entries:
        lines.extend([f"- {subject}", f"<!-- changelog-commit: {commit} -->"])
    return lines


def update_changelog() -> bool:
    grouped = read_commits()
    if not CHANGELOG.exists():
        if not grouped:
            print("No commits found; no changelog was created.")
            return False
        lines = ["# Changelog"]
    else:
        lines = CHANGELOG.read_text(encoding="utf-8").splitlines()
        if not lines or not lines[0].startswith("# "):
            lines.insert(0, "# Changelog")

    recorded = {
        match.group(1)
        for line in lines
        if (match := MARKER.fullmatch(line)) is not None
    }
    changed = False

    for date in sorted(grouped, reverse=True):
        new_entries = [
            (commit, subject)
            for commit, subject in grouped[date]
            if commit not in recorded
        ]
        if not new_entries:
            continue

        headings = valid_headings(lines)
        if date in headings:
            heading_index = headings[date]
            insert_at = heading_index + 1
            while insert_at < len(lines) and not lines[insert_at]:
                insert_at += 1
            additions = entry_lines(new_entries)
            lines[heading_index + 1 : insert_at] = [""] + additions + [""]
        else:
            insert_at = 1
            while insert_at < len(lines) and not lines[insert_at]:
                insert_at += 1
            section = ["", f"## {date}", "", *entry_lines(new_entries), ""]
            lines[insert_at:insert_at] = section

        recorded.update(commit for commit, _ in new_entries)
        changed = True

    if changed:
        CHANGELOG.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
        print(f"Updated {CHANGELOG} with new dated commit entries.")
    else:
        print(f"{CHANGELOG} is up to date.")
    return changed


if __name__ == "__main__":
    update_changelog()
