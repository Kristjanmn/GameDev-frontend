import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private titleService: Title) {
  }

  /**
   * Turn a string into one word by replacing spaces with underscore.
   *
   * @param input string to modify.
   * @return modified string.
   */
  oneWord(input: string): string {
    return input.trim().split(' ').join('_');
  }

  /**
   * Checks if both strings are the same.
   *
   * @param a first string
   * @param b second string
   * @return returns true if both strings are the same
   */
  stringEquals(a: string, b: string): boolean {
    return a.trim().toUpperCase() === b.trim().toUpperCase();
  }

  /**
   * Similar to Java's String isBlank() function.
   *
   * @param input string to check
   * @return returns true if trimmed input length is 0.
   */
  isBlank(input: string): boolean {
    return input.trim().length == 0;
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
