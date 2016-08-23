import {AuthService} from "./auth.service";
import {AuthGuard} from "./auth-guard.service";

export const AppServices = [];

export const AuthServices = [
    AuthService,
    AuthGuard
];