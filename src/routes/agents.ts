import type Database from "better-sqlite3";
import type { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { AgentDetail } from "../components/AgentDetail.js";
import { AgentsList } from "../components/AgentsList.js";
import { NotFoundPage } from "../components/NotFoundPage.js";
import { findAgentWithAilments, listAgents } from "../db/queries.js";

export function registerAgentRoutes(
  app: Hono,
  database: Database.Database,
): void {
  app.get("/agents", (context) =>
    context.html(
      renderToString(jsx(AgentsList, { agents: listAgents(database) })),
    ),
  );

  app.get("/agents/:id", (context) => {
    const id = context.req.param("id");
    if (!/^[a-z0-9-]+$/.test(id)) {
      return context.html(
        renderToString(
          jsx(NotFoundPage, {
            title: "סוכן לא נמצא",
            message: "הסוכן המבוקש לא נמצא.",
          }),
        ),
        404,
      );
    }

    const agent = findAgentWithAilments(database, id);
    if (!agent) {
      return context.html(
        renderToString(
          jsx(NotFoundPage, {
            title: "סוכן לא נמצא",
            message: "הסוכן המבוקש לא נמצא.",
          }),
        ),
        404,
      );
    }

    return context.html(renderToString(jsx(AgentDetail, { agent })));
  });
}
