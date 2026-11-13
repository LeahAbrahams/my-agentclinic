import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "./index.js";
import { initializeDatabase } from "./startup.js";

const temporaryDirectory = mkdtempSync(join(tmpdir(), "agent-clinic-"));

afterEach(() => {
  rmSync(temporaryDirectory, { recursive: true, force: true });
});

describe("database startup", () => {
  it("preserves seeded content across database reopen and startup", () => {
    const databasePath = join(temporaryDirectory, "clinic.db");
    const firstDatabase = openDatabase(databasePath);

    initializeDatabase(firstDatabase);
    firstDatabase.close();

    const reopenedDatabase = openDatabase(databasePath);
    initializeDatabase(reopenedDatabase);

    const counts = {
      agents: reopenedDatabase
        .prepare("SELECT COUNT(*) AS count FROM agents")
        .pluck()
        .get(),
      ailments: reopenedDatabase
        .prepare("SELECT COUNT(*) AS count FROM ailments")
        .pluck()
        .get(),
      relations: reopenedDatabase
        .prepare("SELECT COUNT(*) AS count FROM agent_ailments")
        .pluck()
        .get(),
    };

    expect(counts).toEqual({ agents: 5, ailments: 5, relations: 6 });
    reopenedDatabase.close();
  });

  it("does not hide migration initialization failures", () => {
    const database = openDatabase(":memory:");

    expect(() =>
      initializeDatabase(database, join(temporaryDirectory, "missing")),
    ).toThrow();
    expect(
      database
        .prepare("SELECT name FROM sqlite_master WHERE name = 'agents'")
        .get(),
    ).toBeUndefined();
    database.close();
  });
});
