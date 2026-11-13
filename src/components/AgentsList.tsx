import type { AgentsListProps } from "../types/components.js";
import { agentStatusLabel } from "./agent-status.js";
import { Layout } from "./Layout.js";

export function AgentsList({ agents }: AgentsListProps) {
  return (
    <Layout title="קטלוג סוכנים">
      {agents.length === 0 ? (
        <p>אין סוכנים להצגה כרגע.</p>
      ) : (
        <section class="card-grid" aria-label="רשימת סוכנים">
          {agents.map((agent) => (
            <article key={agent.id}>
              <h3>
                <a href={`/agents/${agent.id}`}>{agent.name}</a>
              </h3>
              <p>
                <strong>סוג מודל:</strong> {agent.modelType}
              </p>
              <p>
                <strong>מצב:</strong> {agentStatusLabel(agent.status)}
              </p>
            </article>
          ))}
        </section>
      )}
    </Layout>
  );
}
