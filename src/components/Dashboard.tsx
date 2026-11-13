import type { DashboardProps } from "../types/components.js";
import { appointmentStatusLabel } from "./appointment-status.js";
import { formatAppointmentDate } from "./appointment-format.js";
import { Layout } from "./Layout.js";

export function Dashboard({ dashboard, error }: DashboardProps) {
  return (
    <Layout title="לוח צוות — הדגמה מקומית">
      <p class="notice">
        לוח זה מיועד להדגמה מקומית בלבד ואינו כולל אימות משתמשים או הרשאות.
      </p>
      {error ? <p class="error-message" role="alert">{error}</p> : null}
      <section aria-label="סיכום פעילות" class="metric-grid">
        <article>
          <h3>סוכנים פעילים</h3>
          <p class="metric-value">{dashboard.metrics.activeAgents}</p>
        </article>
        <article>
          <h3>פגישות ממתינות</h3>
          <p class="metric-value">{dashboard.metrics.pendingAppointments}</p>
        </article>
        <article>
          <h3>תקלות פעילות</h3>
          <p class="metric-value">{dashboard.metrics.activeAilments}</p>
        </article>
      </section>

      <section aria-labelledby="dashboard-agents-heading">
        <h3 id="dashboard-agents-heading">סוכנים פעילים</h3>
        {dashboard.activeAgents.length === 0 ? (
          <p>אין סוכנים פעילים להצגה כרגע.</p>
        ) : (
          <div class="table-container" role="region" aria-label="סוכנים פעילים" tabIndex={0}>
            <table>
              <thead>
                <tr><th scope="col">סוכן</th><th scope="col">סוג מודל</th><th scope="col">תקלות משויכות</th></tr>
              </thead>
              <tbody>
                {dashboard.activeAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td><a href={`/agents/${encodeURIComponent(agent.id)}`}>{agent.name}</a></td>
                    <td>{agent.modelType}</td>
                    <td>{agent.ailmentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section aria-labelledby="dashboard-appointments-heading">
        <h3 id="dashboard-appointments-heading">פגישות ממתינות</h3>
        {dashboard.pendingAppointments.length === 0 ? (
          <p>אין פגישות ממתינות כרגע.</p>
        ) : (
          <div class="table-container" role="region" aria-label="פגישות ממתינות" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">סוכן</th>
                  <th scope="col">צוות שירות</th>
                  <th scope="col">מועד</th>
                  <th scope="col">מצב</th>
                  <th scope="col">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.pendingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.agentName}</td>
                    <td>{appointment.providerName}</td>
                    <td>{formatAppointmentDate(appointment.scheduledAt)}</td>
                    <td>{appointmentStatusLabel(appointment.status)}</td>
                    <td>
                      <form method="post" action={`/dashboard/appointments/${encodeURIComponent(appointment.id)}/status`}>
                        <button name="status" value="confirmed" type="submit">אישור</button>
                        <button name="status" value="cancelled" type="submit" class="secondary">ביטול</button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </Layout>
  );
}
