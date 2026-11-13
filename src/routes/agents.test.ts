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

describe("agent pages", () => {
  it("lists seeded agents with model type and status", async () => {
    const response = await app.request("/agents");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("אורביט");
    expect(body).toContain("LLM לתכנון");
    expect(body).toContain("פעיל");
  });

  it("shows a selected agent and only its related ailments", async () => {
    const response = await app.request("/agents/agent-orbit");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("אורביט");
    expect(body).toContain("לולאת מחשבה אינסופית");
    expect(body).not.toContain("נקודת קצה מדומיינת");
  });

  it("shows an empty state for an agent without related ailments", async () => {
    const response = await app.request("/agents/agent-mirror");

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("אין תקלות משויכות לסוכן הזה");
  });

  it("shows an empty state for an empty agents catalog", async () => {
    database.close();
    database = openDatabase(":memory:");
    runMigrations(database);
    app = createApp(database);

    const response = await app.request("/agents");

    expect(response.status).toBe(200);
    expect(await response.text()).toContain("אין סוכנים להצגה כרגע");
  });

  it.each(["unknown-agent", "!!"])(
    "returns 404 for an unknown or invalid agent identifier: %s",
    async (id) => {
      const response = await app.request(`/agents/${id}`);
      const body = await response.text();

      expect(response.status).toBe(404);
      expect(body).toContain("לא נמצא");
      expect(body).toContain('<html lang="he" dir="rtl">');
      expect(body).toContain("<header>");
      expect(body).toContain("<footer>");
    },
  );

  it("renders database values as escaped text", async () => {
    database
      .prepare("UPDATE agents SET name = ? WHERE id = ?")
      .run("<script>alert(1)</script>", "agent-orbit");

    const response = await app.request("/agents");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(body).not.toContain("<script>alert(1)</script>");
  });
});
