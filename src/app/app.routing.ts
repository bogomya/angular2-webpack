import { Routes, RouterModule } from "@angular/router";
import {NoContent, LoginComponent} from "./components/index";
import {AuthGuard} from "./services/auth-guard.service";
import {AppComponent} from "./app.component";

export const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full"},
    { path: "login", component: LoginComponent},
    { path: "app", component: AppComponent, canActivate: [AuthGuard]},
    { path: "**",    component: NoContent },
];

export const AppRouting = RouterModule.forRoot(routes);