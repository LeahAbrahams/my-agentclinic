import assert from "node:assert/strict";
import test from "node:test";
import { app } from "./app.js";

test("GET / returns the plain-text greeting", async () => {
  const response = await app.request("/");

  assert.equal(response.status, 200);
  assert.equal(await response.text(), "Hello Hono!");
  assert.equal(response.headers.get("content-type")?.split(";")[0], "text/plain");
});

test("GET to an undefined path returns 404", async () => {
  const response = await app.request("/undefined");

  assert.equal(response.status, 404);
});
