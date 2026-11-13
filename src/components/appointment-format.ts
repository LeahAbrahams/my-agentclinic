export function formatAppointmentDate(value: string): string {
  return new Date(value).toLocaleString("he-IL", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
