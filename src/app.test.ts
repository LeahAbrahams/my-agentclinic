import { afterEach, beforeEach, describe, expect, it } from "vitest";
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
  });

  it("returns 404 for an undefined path", async () => {
    const response = await app.request("/undefined");

    expect(response.status).toBe(404);
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
