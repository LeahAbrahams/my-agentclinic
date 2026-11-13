import type { PropsWithChildren } from "hono/jsx";
import type { Agent, AgentWithAilments } from "./agent.js";
import type { Ailment } from "./ailment.js";

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
  ailments: Ailment[];
}

export interface NotFoundPageProps {
  title: string;
  message: string;
}
