import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'index',
  templateUrl: './index.component.html'
})
export class IndexComponent {

  constructor(private router: Router) {
  }

  toNewProject(): void {
    this.router.navigate([environment.newProjectUrl]);
  }
}
