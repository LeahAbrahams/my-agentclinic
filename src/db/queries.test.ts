import { afterEach, describe, expect, it } from "vitest";
import { openDatabase } from "./index.js";
import { runMigrations } from "./migrate.js";
import {
  createAppointment,
  findAppointment,
  getDashboardData,
  listAilmentsWithTherapies,
  listTherapies,
  updateAppointmentStatus,
} from "./queries.js";
import { seedDatabase } from "./seed-data.js";

describe("MVP database queries", () => {
  let database: ReturnType<typeof openDatabase>;

  afterEach(() => {
    database?.close();
  });

  it("lists therapies and the support actions related to each ailment", () => {
    database = openDatabase(":memory:");
    runMigrations(database);
    seedDatabase(database);

    expect(listTherapies(database)).toHaveLength(5);
    expect(listAilmentsWithTherapies(database).find(
      (ailment) => ailment.id === "ailment-loopback",
    )?.therapies).toContainEqual(
      expect.objectContaining({ id: "therapy-prompt-review" }),
    );
    expect(listAilmentsWithTherapies(database)).toHaveLength(5);
  });

  it("creates, retrieves, and updates an appointment using supported statuses", () => {
    database = openDatabase(":memory:");
    runMigrations(database);
    seedDatabase(database);

    const appointment = createAppointment(database, {
      agentId: "agent-orbit",
      providerName: "צוות בדיקה",
      scheduledAt: "2030-01-15T10:00:00.000Z",
    });

    expect(appointment.status).toBe("pending");
    expect(findAppointment(database, appointment.id)).toEqual(appointment);
    expect(updateAppointmentStatus(database, appointment.id, "confirmed")).toBe(true);
    expect(findAppointment(database, appointment.id)?.status).toBe("confirmed");
    expect(updateAppointmentStatus(database, "missing", "cancelled")).toBe(false);
  });

  it("returns dashboard counts and pending appointments", () => {
    database = openDatabase(":memory:");
    runMigrations(database);
    seedDatabase(database);

    const dashboard = getDashboardData(database);

    expect(dashboard.metrics.activeAgents).toBe(3);
    expect(dashboard.metrics.pendingAppointments).toBe(1);
    expect(dashboard.metrics.activeAilments).toBe(4);
    expect(dashboard.activeAgents).toHaveLength(3);
    expect(dashboard.pendingAppointments).toHaveLength(1);
  });
});
