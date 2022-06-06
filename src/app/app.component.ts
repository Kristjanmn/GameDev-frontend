import {Component, OnInit} from '@angular/core';
import {LoadingService} from "./service/loading.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = environment.defaultTitle;

  constructor(
    public loadingService: LoadingService
  ) {}

  ngOnInit() {
    // will add some xsrf logic here, when i get to that part
  }
}
