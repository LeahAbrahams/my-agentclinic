import type { Ailment } from "./ailment.js";

export interface Therapy {
  id: string;
  name: string;
  description: string;
}

export interface TherapyWithAilments extends Therapy {
  ailments: Ailment[];
}

export interface AilmentWithTherapies extends Ailment {
  therapies: Therapy[];
}
