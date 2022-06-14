import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppHeaderComponent} from "./component/app-header/app-header.component";
import {IndexComponent} from "./component/index/index.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {ProjectComponent} from "./component/project/project.component";
import {NewProjectComponent} from "./component/new-project/new-project.component";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    IndexComponent,
    NewProjectComponent,
    ProjectComponent,

    // error 404 - page not found
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
