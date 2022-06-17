import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from "./material/material.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppHeaderComponent} from "./component/app-header/app-header.component";
import {IndexComponent} from "./component/index/index.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {
  NewCueDialog,
  NewDialogDialog,
  NewQuestDialog,
  NewScriptDialog,
  ProjectComponent
} from "./component/project/project.component";
import {CookieService} from "ngx-cookie-service";
import {NewProjectComponent} from "./component/new-project/new-project.component";
import {AuthInterceptor} from "./service/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    IndexComponent,
    NewProjectComponent,
    ProjectComponent,
    NewDialogDialog,
    NewQuestDialog,
    NewScriptDialog,
    NewCueDialog,

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
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
