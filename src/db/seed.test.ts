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
    const therapies = database
      .prepare("SELECT COUNT(*) AS count FROM therapies")
      .get() as { count: number };
    const therapyRelations = database
      .prepare("SELECT COUNT(*) AS count FROM ailment_therapies")
      .get() as { count: number };
    const appointments = database
      .prepare("SELECT COUNT(*) AS count FROM appointments")
      .get() as { count: number };

    expect(agents.count).toBe(5);
    expect(ailments.count).toBe(5);
    expect(relations.count).toBe(6);
    expect(therapies.count).toBeGreaterThanOrEqual(5);
    expect(therapyRelations.count).toBeGreaterThan(0);
    expect(appointments.count).toBe(1);
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

  it("rolls back all seed changes when a therapy conflicts", () => {
    database = openDatabase(":memory:");
    runMigrations(database);
    database
      .prepare("INSERT INTO therapies (id, name, description) VALUES (?, ?, ?)")
      .run("conflict", "בדיקת מסלול", "פעולה מתנגשת");

    expect(() => seedDatabase(database)).toThrow();
    expect(
      database.prepare("SELECT COUNT(*) AS count FROM agents").get(),
    ).toEqual({ count: 0 });
  });
});
