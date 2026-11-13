import type { AgentStatus } from "./agent.js";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export interface Appointment {
  id: string;
  agentId: string;
  agentName: string;
  providerName: string;
  scheduledAt: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface NewAppointment {
  agentId: string;
  providerName: string;
  scheduledAt: string;
}

export interface DashboardData {
  metrics: {
    activeAgents: number;
    pendingAppointments: number;
    activeAilments: number;
  };
  activeAgents: Array<{
    id: string;
    name: string;
    modelType: string;
    status: AgentStatus;
    ailmentCount: number;
  }>;
  pendingAppointments: Appointment[];
}
