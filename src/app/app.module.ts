import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from "./material/material.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppHeaderComponent} from "./component/app-header/app-header.component";
import {IndexComponent} from "./component/index/index.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import {
  CueFormComponent,
  DialogFormComponent,
  NewCueDialog,
  NewDialogDialog,
  NewQuestDialog,
  NewScriptDialog,
  ProjectComponent, ProjectFormComponent, QuestFormComponent, ScriptFormComponent
} from "./component/project/project.component";
import {CookieService} from "ngx-cookie-service";
import {NewProjectComponent} from "./component/new-project/new-project.component";
import {AuthInterceptor} from "./service/auth-interceptor";
import {TabComponent} from "./component/tabs/tab.component";
import {TabsComponent} from "./component/tabs/tabs.component";

@NgModule({
  declarations: [
    AppComponent,
    TabComponent,
    TabsComponent,
    AppHeaderComponent,
    IndexComponent,
    NewProjectComponent,
    ProjectComponent,
    ProjectFormComponent,
    DialogFormComponent,
    QuestFormComponent,
    ScriptFormComponent,
    CueFormComponent,
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
    ReactiveFormsModule,
    DragDropModule
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
