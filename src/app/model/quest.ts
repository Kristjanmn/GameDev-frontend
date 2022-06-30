import {QuestPhase} from "./questPhase";

export interface Quest {
  id: string;
  questId: string;
  title: string;
  phases: QuestPhase[];
  comment: string;
}
