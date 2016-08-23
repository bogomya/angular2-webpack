import { OpaqueToken } from "@angular/core";

export let AppConfigToken = new OpaqueToken("app.config");

export const AppConfig = {
    title: "Angular 2 seed project"
};
