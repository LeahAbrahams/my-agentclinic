import type Database from "better-sqlite3";
import { agentAilments } from "./seeds/agent-ailments.js";
import { agents } from "./seeds/agents.js";
import { ailments } from "./seeds/ailments.js";

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
  });

  insertSeedData();
}
