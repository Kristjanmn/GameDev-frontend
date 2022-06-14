import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {LoadingService} from "../../service/loading.service";

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private loadingService: LoadingService) {}

  toIndex(): void {
    this.router.navigate(['']);
  }
}
