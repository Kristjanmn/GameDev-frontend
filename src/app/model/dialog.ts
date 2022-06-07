import {DialogLine} from "./dialogLine";

export interface Dialog {
  id: string;
  dialogId: string;
  lines: DialogLine[];
}
