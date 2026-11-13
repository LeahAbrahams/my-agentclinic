import type { AppointmentConfirmationProps } from "../types/components.js";
import { appointmentStatusLabel } from "./appointment-status.js";
import { formatAppointmentDate } from "./appointment-format.js";
import { Layout } from "./Layout.js";

export function AppointmentConfirmation({
  appointment,
}: AppointmentConfirmationProps) {
  return (
    <Layout title="אישור בקשת שירות">
      <article>
        <p>הבקשה נקלטה בהצלחה.</p>
        <dl>
          <dt>סוכן</dt>
          <dd>{appointment.agentName}</dd>
          <dt>צוות שירות</dt>
          <dd>{appointment.providerName}</dd>
          <dt>מועד</dt>
          <dd>{formatAppointmentDate(appointment.scheduledAt)}</dd>
          <dt>מצב</dt>
          <dd>{appointmentStatusLabel(appointment.status)}</dd>
        </dl>
      </article>
      <p><a href="/dashboard">מעבר ללוח הצוות</a></p>
    </Layout>
  );
}
