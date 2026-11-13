import type Database from "better-sqlite3";
import type { Agent, AgentStatus, AgentWithAilments } from "../types/agent.js";
import type { Ailment } from "../types/ailment.js";

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
