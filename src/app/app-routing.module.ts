import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IndexComponent} from "./component/index/index.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {NewProjectComponent} from "./component/new-project/new-project.component";
import {ProjectComponent} from "./component/project/project.component";

const routes: Routes = [
  // Index
  {path: '', component: IndexComponent},
  {path: 'new-project', component: NewProjectComponent},
  {path: ':id', component: ProjectComponent},

  // page not found - error 404
  //{path: 'error/404', component: PageNotFoundComponent},
  {path: '**', pathMatch: 'full', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
