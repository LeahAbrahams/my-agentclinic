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

describe("therapy catalog", () => {
  it("lists at least five fictional technical support actions", async () => {
    const response = await app.request("/therapies");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("בדיקת מסלול");
    expect(body).toContain("מפת API");
    expect(body).toContain("רענון מטמון");
  });

  it("shows a Hebrew empty state when no therapies exist", async () => {
    database.prepare("DELETE FROM therapies").run();

    const response = await app.request("/therapies");

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("אין פעולות תמיכה להצגה כרגע");
  });
});
