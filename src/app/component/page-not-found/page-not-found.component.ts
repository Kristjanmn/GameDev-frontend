import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent implements OnInit {
  redirectTime = 5;

  constructor(private router: Router,
              private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle("Page not found")
    setTimeout(() => {
      this.router.navigate(['']);
    }, this.redirectTime * 1000);
  }
}
