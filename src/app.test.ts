import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createApp } from "./app.js";
import { openDatabase } from "./db/index.js";
import { runMigrations } from "./db/migrate.js";
import { seedDatabase } from "./db/seed-data.js";

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

describe("GET /", () => {
  it("renders a semantic home page while preserving the greeting", async () => {
    const response = await app.request("/");
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/html");
    expect(body).toContain("Hello Hono!");
    expect(body).toContain("<header>");
    expect(body).toContain("<main");
    expect(body).toContain("<footer>");
    expect(body).toContain('href="/agents"');
    expect(body).toContain('href="/ailments"');
    expect(body).toContain('href="/therapies"');
    expect(body).toContain('href="/dashboard"');
  });

  it("returns 404 for an undefined path", async () => {
    const response = await app.request("/undefined");
    const body = await response.text();

    expect(response.status).toBe(404);
    expect(body).toContain("העמוד לא נמצא");
    expect(body).toContain('<html lang="he" dir="rtl">');
  });

  it("logs method, path, status, and duration without query values", async () => {
    const log = vi.spyOn(console, "info").mockImplementation(() => undefined);
    try {
      await app.request("/agents?secret=do-not-log");

      expect(log).toHaveBeenCalledOnce();
      expect(log.mock.calls[0]?.[0]).toContain("GET /agents 200");
      expect(log.mock.calls[0]?.[0]).not.toContain("do-not-log");
    } finally {
      log.mockRestore();
    }
  });

  it("renders a safe Hebrew 500 page and logs the internal error", async () => {
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);
    app.get("/__test-error", () => {
      throw new Error("sensitive implementation detail");
    });

    try {
      const response = await app.request("/__test-error");
      const body = await response.text();

      expect(response.status).toBe(500);
      expect(body).toContain("אירעה שגיאה");
      expect(body).not.toContain("sensitive implementation detail");
      expect(errorLog).toHaveBeenCalledOnce();
    } finally {
      errorLog.mockRestore();
    }
  });
});

describe("local stylesheets", () => {
  it.each([
    ["/styles/pico.css", "--pico"],
    ["/styles.css", "@media"],
  ])("serves %s from the application", async (path, expectedContent) => {
    const response = await app.request(path);
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/css");
    expect(body).toContain(expectedContent);
  });
});
