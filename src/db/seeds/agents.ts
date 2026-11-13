import type { Agent } from "../../types/agent.js";

export const agents: Agent[] = [
  {
    id: "agent-orbit",
    name: "אורביט",
    modelType: "LLM לתכנון",
    status: "active",
  },
  {
    id: "agent-echo",
    name: "אקו",
    modelType: "מודל שיח",
    status: "active",
  },
  {
    id: "agent-sentinel",
    name: "סנטינל",
    modelType: "מודל סיווג",
    status: "on_leave",
  },
  {
    id: "agent-patch",
    name: "פאץ׳",
    modelType: "LLM לתיקון קוד",
    status: "active",
  },
  {
    id: "agent-mirror",
    name: "מראה",
    modelType: "מודל הטמעות",
    status: "discharged",
  },
];
