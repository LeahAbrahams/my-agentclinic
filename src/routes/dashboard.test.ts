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

function postStatus(id: string, status: string) {
  return app.request(`/dashboard/appointments/${id}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ status }),
  });
}

describe("staff dashboard", () => {
  it("shows summary counts, active agents, and pending appointments", async () => {
    const response = await app.request("/dashboard");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("סוכנים פעילים");
    expect(body).toContain("פגישות ממתינות");
    expect(body).toContain("תקלות פעילות");
    expect(body).toContain("אורביט");
    expect(body).toContain("צוות בדיקת הפרומפטים");
  });

  it.each(["confirmed", "cancelled"])(
    "updates a pending appointment to %s",
    async (status) => {
      const response = await postStatus("appointment-demo", status);

      expect(response.status).toBe(303);
      expect(response.headers.get("location")).toBe("/dashboard");
      expect(
        database
          .prepare("SELECT status FROM appointments WHERE id = ?")
          .get("appointment-demo"),
      ).toEqual({ status });
    },
  );

  it("rejects an unsupported status without changing the appointment", async () => {
    const response = await postStatus("appointment-demo", "deleted");

    expect(response.status).toBe(400);
    expect(await response.text()).toContain("לא ניתן לעדכן");
    expect(
      database
        .prepare("SELECT status FROM appointments WHERE id = ?")
        .get("appointment-demo"),
    ).toEqual({ status: "pending" });
  });

  it("returns 404 for an unknown appointment", async () => {
    const response = await postStatus("missing", "confirmed");
    expect(response.status).toBe(404);
  });

  it("shows empty states when the database has no catalog or appointments", async () => {
    database.prepare("DELETE FROM appointments").run();
    database.prepare("DELETE FROM agent_ailments").run();
    database.prepare("DELETE FROM agents").run();

    const response = await app.request("/dashboard");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("אין סוכנים פעילים להצגה כרגע");
    expect(body).toContain("אין פגישות ממתינות כרגע");
  });
});
