import {Script} from "./script";

export interface QuestPhase {
  phaseId: string;
  description: string;
  script: Script[];
  comment: string;
}
