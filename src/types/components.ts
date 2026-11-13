import type { PropsWithChildren } from "hono/jsx";
import type { Agent, AgentWithAilments } from "./agent.js";
import type {
  Appointment,
  DashboardData,
} from "./appointment.js";
import type { AilmentWithTherapies, Therapy } from "./therapy.js";

export type LayoutProps = PropsWithChildren<{
  title: string;
}>;

export interface AgentsListProps {
  agents: Agent[];
}

export interface AgentDetailProps {
  agent: AgentWithAilments;
}

export interface AilmentsListProps {
  ailments: AilmentWithTherapies[];
}

export interface TherapiesListProps {
  therapies: Therapy[];
}

export interface AppointmentFormProps {
  agentId: string;
  agentName: string;
  providerName?: string;
  scheduledAt?: string;
  error?: string;
}

export interface AppointmentConfirmationProps {
  appointment: Appointment;
}

export interface DashboardProps {
  dashboard: DashboardData;
  error?: string;
}

export interface ServerErrorPageProps {
  message?: string;
}

export interface NotFoundPageProps {
  title: string;
  message: string;
}
