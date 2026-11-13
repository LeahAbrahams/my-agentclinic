import type Database from "better-sqlite3";
import { agentAilments } from "./seeds/agent-ailments.js";
import { agents } from "./seeds/agents.js";
import { ailments } from "./seeds/ailments.js";
import { ailmentTherapies } from "./seeds/ailment-therapies.js";
import { therapies } from "./seeds/therapies.js";

export function seedDatabase(database: Database.Database): void {
  const insertAgent = database.prepare(`
    INSERT INTO agents (id, name, model_type, status)
    VALUES (@id, @name, @modelType, @status)
    ON CONFLICT (id) DO NOTHING
  `);
  const insertAilment = database.prepare(`
    INSERT INTO ailments (id, name, description)
    VALUES (@id, @name, @description)
    ON CONFLICT (id) DO NOTHING
  `);
  const insertRelation = database.prepare(`
    INSERT INTO agent_ailments (agent_id, ailment_id)
    VALUES (@agentId, @ailmentId)
    ON CONFLICT (agent_id, ailment_id) DO NOTHING
  `);
  const insertTherapy = database.prepare(`
    INSERT INTO therapies (id, name, description)
    VALUES (@id, @name, @description)
    ON CONFLICT (id) DO NOTHING
  `);
  const insertAilmentTherapy = database.prepare(`
    INSERT INTO ailment_therapies (ailment_id, therapy_id)
    VALUES (@ailmentId, @therapyId)
    ON CONFLICT (ailment_id, therapy_id) DO NOTHING
  `);
  const insertAppointment = database.prepare(`
    INSERT INTO appointments (id, agent_id, provider_name, scheduled_at)
    VALUES (@id, @agentId, @providerName, @scheduledAt)
    ON CONFLICT (id) DO NOTHING
  `);

  const insertSeedData = database.transaction(() => {
    for (const agent of agents) {
      insertAgent.run(agent);
    }

    for (const ailment of ailments) {
      insertAilment.run(ailment);
    }

    for (const relation of agentAilments) {
      insertRelation.run(relation);
    }

    for (const therapy of therapies) {
      insertTherapy.run(therapy);
    }

    for (const relation of ailmentTherapies) {
      insertAilmentTherapy.run(relation);
    }

    insertAppointment.run({
      id: "appointment-demo",
      agentId: "agent-orbit",
      providerName: "צוות בדיקת הפרומפטים",
      scheduledAt: "2030-01-15T10:00:00.000Z",
    });
  });

  insertSeedData();
}
