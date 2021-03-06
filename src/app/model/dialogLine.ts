import {Script} from "./script";

export interface DialogLine {
  lineId: string;
  nextLine: string;
  choices: string[];
  cue: string;
  waitTime: number;
  lineText: string;
  script: Script[];
  locked: boolean;
  comment: string;
}
