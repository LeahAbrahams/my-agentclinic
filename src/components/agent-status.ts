import type { AgentStatus } from "../types/agent.js";

const statusLabels: Record<AgentStatus, string> = {
  active: "פעיל",
  on_leave: "בהפסקה",
  discharged: "משוחרר",
};

export function agentStatusLabel(status: AgentStatus): string {
  return statusLabels[status];
}
