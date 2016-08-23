import {NgModule}      from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule} from "@angular/http";

import {AppComponent}  from "./app.component";
import {LoginComponent} from "./components/index";
import {AuthServices, AppServices} from "./services/index";
import {AppRouting} from "./app.routing";
import {AppConfig, AppConfigToken} from "./app.config";

@NgModule({
    imports: [
        [BrowserModule, ReactiveFormsModule, RouterModule, HttpModule],
        [AppRouting]
    ],
    declarations: [ [AppComponent, LoginComponent]],
    providers: [{ provide: AppConfigToken, useValue: AppConfig }, AppServices, AuthServices],
    bootstrap:    [ [AppComponent] ]
})
export class AppModule { }