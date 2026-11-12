---
name: changelog
description: "Create or update the project CHANGELOG.md from local Git history. Use when asked to update, generate, or review the changelog before a release or merge."
---

# Changelog

Maintain a dated, newest-first `CHANGELOG.md` in the project root using local
commit subjects. This skill changes documentation only; it never creates
commits, branches, merges, or pushes.

## Procedure

1. Run `python .claude/skills/changelog/scripts/changelog.py` from the project
   root.
2. Read the resulting `CHANGELOG.md` and check that entries are grouped under
   `## YYYY-MM-DD` headings in newest-first order.
3. If the script reports no changes, verify that the existing entries already
   cover the requested work.
4. Report the file changed and the Git date range included. Leave any Git
   operation to the user or a separately approved workflow.

The script uses only Python's standard library and Git. Hidden commit markers
make repeated runs idempotent, including when multiple commits share a date.
