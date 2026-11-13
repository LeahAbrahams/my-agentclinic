import type Database from "better-sqlite3";
import type { Hono } from "hono";
import { jsx } from "hono/jsx";
import { renderToString } from "hono/jsx/dom/server";
import { Dashboard } from "../components/Dashboard.js";
import { NotFoundPage } from "../components/NotFoundPage.js";
import { getDashboardData, updateAppointmentStatus } from "../db/queries.js";
import type { AppointmentStatus } from "../types/appointment.js";

function isAppointmentStatus(value: string): value is AppointmentStatus {
  return value === "confirmed" || value === "cancelled";
}

function renderDashboard(
  database: Database.Database,
  error?: string,
): string {
  return renderToString(
    jsx(Dashboard, {
      dashboard: getDashboardData(database),
      ...(error === undefined ? {} : { error }),
    }),
  );
}

export function registerDashboardRoutes(
  app: Hono,
  database: Database.Database,
): void {
  app.get("/dashboard", (context) =>
    context.html(renderDashboard(database)),
  );

  app.post("/dashboard/appointments/:id/status", async (context) => {
    const appointmentId = context.req.param("id");
    const body = await context.req.parseBody();
    const status = typeof body.status === "string" ? body.status : "";

    if (!isAppointmentStatus(status)) {
      return context.html(
        renderDashboard(database, "לא ניתן לעדכן: מצב הפגישה אינו נתמך."),
        400,
      );
    }

    if (!updateAppointmentStatus(database, appointmentId, status)) {
      return context.html(
        renderToString(
          jsx(NotFoundPage, {
            title: "פגישה לא נמצאה",
            message: "הפגישה המבוקשת לא נמצאה.",
          }),
        ),
        404,
      );
    }

    return context.redirect("/dashboard", 303);
  });
}
