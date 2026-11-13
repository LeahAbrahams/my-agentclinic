import type { AppointmentStatus } from "../types/appointment.js";

export function appointmentStatusLabel(status: AppointmentStatus): string {
  const labels: Record<AppointmentStatus, string> = {
    pending: "ממתינה",
    confirmed: "אושרה",
    cancelled: "בוטלה",
  };
  return labels[status];
}
