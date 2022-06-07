import {Script} from "./script";

export interface DialogLine {
  id: string;
  lineId: string;
  nextLine: string;
  choices: string[];
  cue: string;
  waitTime: number;
  lineText: string;
  script: Script[];
}
