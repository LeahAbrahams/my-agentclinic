import type Database from "better-sqlite3";
import type { Agent, AgentStatus, AgentWithAilments } from "../types/agent.js";
import { randomUUID } from "node:crypto";
import type {
  Appointment,
  AppointmentStatus,
  DashboardData,
  NewAppointment,
} from "../types/appointment.js";
import type { Ailment } from "../types/ailment.js";
import type { AilmentWithTherapies, Therapy } from "../types/therapy.js";

interface AgentRow {
  id: string;
  name: string;
  model_type: string;
  status: AgentStatus;
}

interface AgentAilmentRow extends AgentRow {
  ailment_id: string | null;
  ailment_name: string | null;
  ailment_description: string | null;
}

interface AilmentRow {
  id: string;
  name: string;
  description: string;
}

interface TherapyRow {
  id: string;
  name: string;
  description: string;
}

interface AilmentTherapyRow extends AilmentRow {
  therapy_id: string | null;
  therapy_name: string | null;
  therapy_description: string | null;
}

interface AppointmentRow {
  id: string;
  agent_id: string;
  agent_name: string;
  provider_name: string;
  scheduled_at: string;
  status: AppointmentStatus;
  created_at: string;
}

interface DashboardCountsRow {
  active_agents: number;
  pending_appointments: number;
  active_ailments: number;
}

interface DashboardAgentRow extends AgentRow {
  ailment_count: number;
}

function mapAppointment(row: AppointmentRow): Appointment {
  return {
    id: row.id,
    agentId: row.agent_id,
    agentName: row.agent_name,
    providerName: row.provider_name,
    scheduledAt: row.scheduled_at,
    status: row.status,
    createdAt: row.created_at,
  };
}

export function listAgents(database: Database.Database): Agent[] {
  const rows = database
    .prepare(
      `SELECT id, name, model_type, status
       FROM agents
       ORDER BY name`,
    )
    .all() as AgentRow[];

  return rows.map(({ id, name, model_type, status }) => ({
    id,
    name,
    modelType: model_type,
    status,
  }));
}

export function findAgentWithAilments(
  database: Database.Database,
  id: string,
): AgentWithAilments | null {
  const rows = database
    .prepare(
      `SELECT
         agents.id,
         agents.name,
         agents.model_type,
         agents.status,
         ailments.id AS ailment_id,
         ailments.name AS ailment_name,
         ailments.description AS ailment_description
       FROM agents
       LEFT JOIN agent_ailments ON agent_ailments.agent_id = agents.id
       LEFT JOIN ailments ON ailments.id = agent_ailments.ailment_id
       WHERE agents.id = ?
       ORDER BY ailments.name`,
    )
    .all(id) as AgentAilmentRow[];

  const agentRow = rows[0];
  if (!agentRow) {
    return null;
  }

  return {
    id: agentRow.id,
    name: agentRow.name,
    modelType: agentRow.model_type,
    status: agentRow.status,
    ailments: rows.flatMap((row) => {
      if (
        row.ailment_id === null ||
        row.ailment_name === null ||
        row.ailment_description === null
      ) {
        return [];
      }

      return [
        {
          id: row.ailment_id,
          name: row.ailment_name,
          description: row.ailment_description,
        },
      ];
    }),
  };
}

export function listAilments(database: Database.Database): Ailment[] {
  return database
    .prepare("SELECT id, name, description FROM ailments ORDER BY name")
    .all() as AilmentRow[];
}

export function listTherapies(database: Database.Database): Therapy[] {
  return database
    .prepare("SELECT id, name, description FROM therapies ORDER BY name")
    .all() as TherapyRow[];
}

export function listAilmentsWithTherapies(
  database: Database.Database,
): AilmentWithTherapies[] {
  const rows = database
    .prepare(
      `SELECT
         ailments.id,
         ailments.name,
         ailments.description,
         therapies.id AS therapy_id,
         therapies.name AS therapy_name,
         therapies.description AS therapy_description
       FROM ailments
       LEFT JOIN ailment_therapies
         ON ailment_therapies.ailment_id = ailments.id
       LEFT JOIN therapies
         ON therapies.id = ailment_therapies.therapy_id
       ORDER BY ailments.name, therapies.name`,
    )
    .all() as AilmentTherapyRow[];

  const ailments = new Map<string, AilmentWithTherapies>();
  for (const row of rows) {
    let ailment = ailments.get(row.id);
    if (!ailment) {
      ailment = {
        id: row.id,
        name: row.name,
        description: row.description,
        therapies: [],
      };
      ailments.set(row.id, ailment);
    }

    if (
      row.therapy_id !== null &&
      row.therapy_name !== null &&
      row.therapy_description !== null
    ) {
      ailment.therapies.push({
        id: row.therapy_id,
        name: row.therapy_name,
        description: row.therapy_description,
      });
    }
  }

  return [...ailments.values()];
}

export function createAppointment(
  database: Database.Database,
  appointment: NewAppointment,
): Appointment {
  const id = randomUUID();
  database
    .prepare(
      `INSERT INTO appointments (id, agent_id, provider_name, scheduled_at)
       VALUES (?, ?, ?, ?)`,
    )
    .run(id, appointment.agentId, appointment.providerName, appointment.scheduledAt);

  const created = findAppointment(database, id);
  if (!created) {
    throw new Error("Created appointment could not be retrieved.");
  }
  return created;
}

export function findAppointment(
  database: Database.Database,
  id: string,
): Appointment | null {
  const row = database
    .prepare(
      `SELECT
         appointments.id,
         appointments.agent_id,
         agents.name AS agent_name,
         appointments.provider_name,
         appointments.scheduled_at,
         appointments.status,
         appointments.created_at
       FROM appointments
       JOIN agents ON agents.id = appointments.agent_id
       WHERE appointments.id = ?`,
    )
    .get(id) as AppointmentRow | undefined;

  return row ? mapAppointment(row) : null;
}

export function updateAppointmentStatus(
  database: Database.Database,
  id: string,
  status: AppointmentStatus,
): boolean {
  const result = database
    .prepare("UPDATE appointments SET status = ? WHERE id = ?")
    .run(status, id);
  return result.changes > 0;
}

export function getDashboardData(
  database: Database.Database,
): DashboardData {
  const metrics = database
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM agents WHERE status = 'active') AS active_agents,
         (SELECT COUNT(*) FROM appointments WHERE status = 'pending') AS pending_appointments,
         (SELECT COUNT(DISTINCT agent_ailments.ailment_id)
          FROM agent_ailments
          JOIN agents ON agents.id = agent_ailments.agent_id
          WHERE agents.status = 'active') AS active_ailments`,
    )
    .get() as DashboardCountsRow;

  const activeAgents = database
    .prepare(
      `SELECT
         agents.id,
         agents.name,
         agents.model_type,
         agents.status,
         COUNT(DISTINCT agent_ailments.ailment_id) AS ailment_count
       FROM agents
       LEFT JOIN agent_ailments ON agent_ailments.agent_id = agents.id
       WHERE agents.status = 'active'
       GROUP BY agents.id
       ORDER BY agents.name`,
    )
    .all() as DashboardAgentRow[];

  const pendingAppointments = database
    .prepare(
      `SELECT
         appointments.id,
         appointments.agent_id,
         agents.name AS agent_name,
         appointments.provider_name,
         appointments.scheduled_at,
         appointments.status,
         appointments.created_at
       FROM appointments
       JOIN agents ON agents.id = appointments.agent_id
       WHERE appointments.status = 'pending'
       ORDER BY appointments.scheduled_at, appointments.created_at`,
    )
    .all() as AppointmentRow[];

  return {
    metrics: {
      activeAgents: metrics.active_agents,
      pendingAppointments: metrics.pending_appointments,
      activeAilments: metrics.active_ailments,
    },
    activeAgents: activeAgents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      modelType: agent.model_type,
      status: agent.status,
      ailmentCount: agent.ailment_count,
    })),
    pendingAppointments: pendingAppointments.map(mapAppointment),
  };
}
