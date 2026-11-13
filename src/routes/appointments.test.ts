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

function postAppointment(values: Record<string, string>) {
  return app.request("/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(values),
  });
}

describe("appointment booking", () => {
  it("shows a form with the selected agent", async () => {
    const response = await app.request(
      "/appointments/new?agentId=agent-orbit",
    );
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(body).toContain("אורביט");
    expect(body).toContain('name="agentId" value="agent-orbit"');
  });

  it("creates a single appointment and redirects to its confirmation", async () => {
    const response = await postAppointment({
      agentId: "agent-orbit",
      providerName: "צוות בדיקה",
      scheduledAt: "2031-02-10T12:30",
    });

    expect(response.status).toBe(303);
    const location = response.headers.get("location");
    expect(location).toMatch(/^\/appointments\/.+\/confirmation$/);
    expect(
      database.prepare("SELECT COUNT(*) AS count FROM appointments").get(),
    ).toEqual({ count: 2 });

    const confirmation = await app.request(location ?? "");
    expect(confirmation.status).toBe(200);
    expect(await confirmation.text()).toContain("צוות בדיקה");
  });

  it.each([
    {
      agentId: "agent-orbit",
      providerName: "",
      scheduledAt: "2031-02-10T12:30",
    },
    {
      agentId: "agent-orbit",
      providerName: "צוות בדיקה",
      scheduledAt: "2031-02-31T12:30",
    },
    {
      agentId: "agent-orbit",
      providerName: "צוות בדיקה",
      scheduledAt: "2031-13-10T12:30",
    },
    {
      agentId: "missing-agent",
      providerName: "צוות בדיקה",
      scheduledAt: "2031-02-10T12:30",
    },
  ])("rejects invalid input without creating an appointment", async (values) => {
    const response = await postAppointment(values);

    expect(response.status).toBe(400);
    expect(await response.text()).toContain("לא נוצרה פגישה");
    expect(
      database.prepare("SELECT COUNT(*) AS count FROM appointments").get(),
    ).toEqual({ count: 1 });
  });

  it("renders submitted HTML as escaped text", async () => {
    const response = await postAppointment({
      agentId: "agent-orbit",
      providerName: "<script>alert(1)</script>",
      scheduledAt: "2031-02-10T12:30",
    });
    const location = response.headers.get("location");
    const confirmation = await app.request(location ?? "");
    const body = await confirmation.text();

    expect(body).toContain("&lt;script&gt;alert(1)&lt;/script&gt;");
    expect(body).not.toContain("<script>alert(1)</script>");
  });

  it("returns 404 when an appointment confirmation does not exist", async () => {
    const response = await app.request(
      "/appointments/missing/confirmation",
    );
    expect(response.status).toBe(404);
  });
});
