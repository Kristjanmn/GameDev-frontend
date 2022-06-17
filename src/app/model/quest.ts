import {QuestPhase} from "./questPhase";

export interface Quest {
  questId: string;
  title: string;
  phases: QuestPhase[];
  comment: string;
}
