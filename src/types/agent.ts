import type { Ailment } from "./ailment.js";

export type AgentStatus = "active" | "on_leave" | "discharged";

export interface Agent {
  id: string;
  name: string;
  modelType: string;
  status: AgentStatus;
}

export interface AgentWithAilments extends Agent {
  ailments: Ailment[];
}
