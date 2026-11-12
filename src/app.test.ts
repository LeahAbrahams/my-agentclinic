import { describe, expect, it } from "vitest";
import { app } from "./app.js";

describe("GET /", () => {
  it("returns the exact plain-text greeting", async () => {
    const response = await app.request("/");

    expect(response.status).toBe(200);
    expect(await response.text()).toBe("Hello Hono!");
    expect(response.headers.get("content-type")?.split(";")[0]).toBe("text/plain");
  });

  it("returns 404 for an undefined path", async () => {
    const response = await app.request("/undefined");

    expect(response.status).toBe(404);
  });
});
