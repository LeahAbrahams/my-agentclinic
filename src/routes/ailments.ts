import type Database from "better-sqlite3";
import type { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { AilmentsList } from "../components/AilmentsList.js";
import { listAilmentsWithTherapies } from "../db/queries.js";

export function registerAilmentRoutes(
  app: Hono,
  database: Database.Database,
): void {
  app.get("/ailments", (context) =>
    context.html(
      renderToString(
        jsx(AilmentsList, {
          ailments: listAilmentsWithTherapies(database),
        }),
      ),
    ),
  );
}
