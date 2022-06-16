import {ScriptVariable} from "./scriptVariable";

export interface Script {
  global: boolean;
  name: string
  variables: ScriptVariable[];
  comment: string;
}
