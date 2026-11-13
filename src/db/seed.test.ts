import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "./index.js";
import { runMigrations } from "./migrate.js";
import { seedDatabase } from "./seed-data.js";

describe("SQLite seed data", () => {
  let database: ReturnType<typeof openDatabase>;

  afterEach(() => {
    database?.close();
  });

  it("creates fictional catalog data and remains idempotent", () => {
    database = openDatabase(":memory:");
    runMigrations(database);

    seedDatabase(database);
    seedDatabase(database);

    const agents = database
      .prepare("SELECT COUNT(*) AS count FROM agents")
      .get() as { count: number };
    const ailments = database
      .prepare("SELECT COUNT(*) AS count FROM ailments")
      .get() as { count: number };
    const relations = database
      .prepare("SELECT COUNT(*) AS count FROM agent_ailments")
      .get() as { count: number };

    expect(agents.count).toBe(5);
    expect(ailments.count).toBe(5);
    expect(relations.count).toBe(6);
    expect(database.prepare("PRAGMA foreign_key_check").all()).toEqual([]);
  });

  it("surfaces seed conflicts instead of silently ignoring invalid data", () => {
    database = openDatabase(":memory:");
    runMigrations(database);
    database
      .prepare(
        "INSERT INTO agents (id, name, model_type, status) VALUES (?, ?, ?, ?)",
      )
      .run("conflicting-agent", "אורביט", "מודל מתנגש", "active");

    expect(() => seedDatabase(database)).toThrow();
    expect(
      database.prepare("SELECT COUNT(*) AS count FROM agents").get(),
    ).toEqual({ count: 1 });
  });
});
