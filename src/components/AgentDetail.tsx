import type { AgentDetailProps } from "../types/components.js";
import { agentStatusLabel } from "./agent-status.js";
import { Layout } from "./Layout.js";

export function AgentDetail({ agent }: AgentDetailProps) {
  return (
    <Layout title={`פרופיל: ${agent.name}`}>
      <article>
        <p>
          <a href={`/appointments/new?agentId=${encodeURIComponent(agent.id)}`}>
            קביעת פגישת שירות
          </a>
        </p>
        <p>
          <strong>שם:</strong> {agent.name}
        </p>
        <p>
          <strong>סוג מודל:</strong> {agent.modelType}
        </p>
        <p>
          <strong>מצב:</strong> {agentStatusLabel(agent.status)}
        </p>
        <section aria-labelledby="agent-ailments-heading">
          <h3 id="agent-ailments-heading">תקלות משויכות</h3>
          {agent.ailments.length === 0 ? (
            <p>אין תקלות משויכות לסוכן הזה.</p>
          ) : (
            <ul>
              {agent.ailments.map((ailment) => (
                <li key={ailment.id}>
                  <a href="/ailments">{ailment.name}</a>
                  <p>{ailment.description}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <p>
          <a href="/agents">חזרה לקטלוג הסוכנים</a>
        </p>
      </article>
    </Layout>
  );
}
