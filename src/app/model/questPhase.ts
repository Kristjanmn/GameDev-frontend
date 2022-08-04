import {Script} from "./script";

export interface QuestPhase {
  id: string;
  phaseId: string;
  description: string;
  script: Script[];
  comment: string;
  zOrder: number;
}
