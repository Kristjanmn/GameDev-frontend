import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() {
  }

  oneWord(input: string): string {
    return input.trim().split(' ').join('_');
  }
}
