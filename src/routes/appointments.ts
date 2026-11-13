import type Database from "better-sqlite3";
import type { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { AppointmentConfirmation } from "../components/AppointmentConfirmation.js";
import { AppointmentForm } from "../components/AppointmentForm.js";
import { NotFoundPage } from "../components/NotFoundPage.js";
import {
  createAppointment,
  findAppointment,
  findAgentWithAilments,
} from "../db/queries.js";

function isValidLocalDateTime(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    return false;
  }
  const date = new Date(value);
  const [year, month, day, hour, minute] = value
    .split(/[-T:]/)
    .map(Number);
  return (
    Number.isFinite(date.getTime()) &&
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    date.getHours() === hour &&
    date.getMinutes() === minute
  );
}

function renderNotFound() {
  return renderToString(
    jsx(NotFoundPage, {
      title: "סוכן לא נמצא",
      message: "הסוכן המבוקש לא נמצא.",
    }),
  );
}

export function registerAppointmentRoutes(
  app: Hono,
  database: Database.Database,
): void {
  app.get("/appointments/new", (context) => {
    const agentId = context.req.query("agentId")?.trim() ?? "";
    const agent = findAgentWithAilments(database, agentId);
    if (!agent) {
      return context.html(renderNotFound(), 404);
    }

    return context.html(
      renderToString(
        jsx(AppointmentForm, { agentId: agent.id, agentName: agent.name }),
      ),
    );
  });

  app.post("/appointments", async (context) => {
    const body = await context.req.parseBody();
    const agentId =
      typeof body.agentId === "string" ? body.agentId.trim() : "";
    const providerName =
      typeof body.providerName === "string" ? body.providerName.trim() : "";
    const scheduledAt =
      typeof body.scheduledAt === "string" ? body.scheduledAt.trim() : "";
    const agent = agentId ? findAgentWithAilments(database, agentId) : null;
    const valid =
      agent !== null &&
      providerName.length > 0 &&
      isValidLocalDateTime(scheduledAt);

    if (!valid || !agent) {
      return context.html(
        renderToString(
          jsx(AppointmentForm, {
            agentId,
            agentName: agent?.name ?? "סוכן לא מזוהה",
            providerName,
            scheduledAt,
            error: "לא נוצרה פגישה. יש לבדוק את פרטי הסוכן, צוות השירות והמועד.",
          }),
        ),
        400,
      );
    }

    const appointment = createAppointment(database, {
      agentId: agent.id,
      providerName,
      scheduledAt: new Date(scheduledAt).toISOString(),
    });
    return context.redirect(
      `/appointments/${encodeURIComponent(appointment.id)}/confirmation`,
      303,
    );
  });

  app.get("/appointments/:id/confirmation", (context) => {
    const appointment = findAppointment(
      database,
      context.req.param("id"),
    );
    if (!appointment) {
      return context.html(renderNotFound(), 404);
    }
    return context.html(
      renderToString(jsx(AppointmentConfirmation, { appointment })),
    );
  });
}
