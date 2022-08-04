import {ScriptVariable} from "./scriptVariable";

export interface Script {
  id: string;
  global: boolean;
  name: string
  variables: ScriptVariable[];
  comment: string;
}
