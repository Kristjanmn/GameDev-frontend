import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {IndexComponent} from "./component/index/index.component";

const routes: Routes = [
  // Index
  {path: '', component: IndexComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
