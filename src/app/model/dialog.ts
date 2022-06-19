import {DialogLine} from "./dialogLine";

export interface Dialog {
  dialogId: string;
  lines: DialogLine[];
  comment: string;
}
