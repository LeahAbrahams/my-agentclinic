import type { AppointmentFormProps } from "../types/components.js";
import { Layout } from "./Layout.js";

export function AppointmentForm({
  agentId,
  agentName,
  providerName = "",
  scheduledAt = "",
  error,
}: AppointmentFormProps) {
  return (
    <Layout title="בקשת פגישת שירות">
      <p>קביעת שירות טכני עבור הסוכן: <strong>{agentName}</strong></p>
      {error ? <p class="error-message" role="alert">{error}</p> : null}
      <form method="post" action="/appointments">
        <input type="hidden" name="agentId" value={agentId} />
        <label>
          שם צוות השירות
          <input
            type="text"
            name="providerName"
            value={providerName}
            required
            autoComplete="organization"
          />
        </label>
        <label>
          מועד השירות
          <input
            type="datetime-local"
            name="scheduledAt"
            value={scheduledAt}
            required
          />
        </label>
        <button type="submit">שליחת בקשה</button>
      </form>
      <p><a href={`/agents/${encodeURIComponent(agentId)}`}>חזרה לפרופיל הסוכן</a></p>
    </Layout>
  );
}
