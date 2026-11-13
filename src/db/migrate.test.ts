import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "./index.js";
import { runMigrations } from "./migrate.js";

describe("SQLite migrations", () => {
  let database: ReturnType<typeof openDatabase>;

  afterEach(() => {
    database?.close();
  });

  it("applies the ordered schema once and is safe to repeat", () => {
    database = openDatabase(":memory:");

    runMigrations(database);
    runMigrations(database);

    const tables = database
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name",
      )
      .all()
      .map((row) => (row as { name: string }).name);

    expect(tables).toEqual([
      "agent_ailments",
      "agents",
      "ailments",
      "schema_migrations",
    ]);
    expect(
      database.prepare("SELECT COUNT(*) AS count FROM schema_migrations").get(),
    ).toEqual({ count: 3 });
  });

  it("enforces foreign keys on relation records", () => {
    database = openDatabase(":memory:");
    runMigrations(database);

    expect(() =>
      database
        .prepare(
          "INSERT INTO agent_ailments (agent_id, ailment_id) VALUES (?, ?)",
        )
        .run("missing-agent", "missing-ailment"),
    ).toThrow();
  });

  it("rolls back a failed migration without recording it", () => {
    const migrationsDirectory = mkdtempSync(
      join(tmpdir(), "agent-clinic-migrations-"),
    );
    database = openDatabase(":memory:");

    try {
      writeFileSync(
        join(migrationsDirectory, "001_create_first.sql"),
        "CREATE TABLE first_migration (id TEXT PRIMARY KEY);",
      );
      writeFileSync(
        join(migrationsDirectory, "002_fail.sql"),
        "CREATE TABLE should_rollback (id TEXT PRIMARY KEY); INVALID SQL;",
      );

      expect(() => runMigrations(database, migrationsDirectory)).toThrow();
      expect(
        database
          .prepare("SELECT COUNT(*) AS count FROM schema_migrations")
          .get(),
      ).toEqual({ count: 1 });
      expect(
        database
          .prepare("SELECT name FROM sqlite_master WHERE name = 'should_rollback'")
          .get(),
      ).toBeUndefined();
    } finally {
      rmSync(migrationsDirectory, { recursive: true, force: true });
    }
  });
});
