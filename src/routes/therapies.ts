import type Database from "better-sqlite3";
import type { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { TherapiesList } from "../components/TherapiesList.js";
import { listTherapies } from "../db/queries.js";

export function registerTherapyRoutes(
  app: Hono,
  database: Database.Database,
): void {
  app.get("/therapies", (context) =>
    context.html(
      renderToString(jsx(TherapiesList, { therapies: listTherapies(database) })),
    ),
  );
}
