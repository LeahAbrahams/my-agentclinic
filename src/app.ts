import { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type Database from "better-sqlite3";
import { registerAilmentRoutes } from "./routes/ailments.js";
import { registerAgentRoutes } from "./routes/agents.js";
import { HomePage } from "./components/HomePage.js";

const picoCss = readFileSync(
  resolve(
    process.cwd(),
    "node_modules",
    "@picocss",
    "pico",
    "css",
    "pico.classless.min.css",
  ),
  "utf8",
);
const localCss = readFileSync(
  resolve(process.cwd(), "src", "static", "styles.css"),
  "utf8",
);

export function createApp(database: Database.Database): Hono {
  const app = new Hono();

  app.get("/", (context) =>
    context.html(renderToString(jsx(HomePage, {}))),
  );
  app.get("/styles/pico.css", (context) =>
    context.text(picoCss, 200, { "Content-Type": "text/css; charset=utf-8" }),
  );
  app.get("/styles.css", (context) =>
    context.text(localCss, 200, { "Content-Type": "text/css; charset=utf-8" }),
  );

  registerAgentRoutes(app, database);
  registerAilmentRoutes(app, database);

  return app;
}
