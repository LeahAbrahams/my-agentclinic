import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createApp } from "../app.js";
import { openDatabase } from "../db/index.js";
import { runMigrations } from "../db/migrate.js";
import { seedDatabase } from "../db/seed-data.js";

let database: ReturnType<typeof openDatabase>;
let app: ReturnType<typeof createApp>;

beforeEach(() => {
  database = openDatabase(":memory:");
  runMigrations(database);
  seedDatabase(database);
  app = createApp(database);
});

afterEach(() => {
  database.close();
});

describe("ailment catalog", () => {
  it("lists the seeded ailments with descriptions", async () => {
    const response = await app.request("/ailments");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("לולאת מחשבה אינסופית");
    expect(body).toContain("הסוכן חוזר שוב ושוב");
    expect(body).toContain("תסמונת 500");
    expect(body).toContain("פעולות תמיכה מומלצות");
    expect(body).toContain("בדיקת מסלול");
  });

  it("shows a Hebrew empty state when the catalog has no entries", async () => {
    database.close();
    database = openDatabase(":memory:");
    runMigrations(database);
    app = createApp(database);

    const response = await app.request("/ailments");

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("אין תקלות להצגה כרגע");
  });
});
