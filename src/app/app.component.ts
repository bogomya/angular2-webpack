import {Component, ViewEncapsulation} from "@angular/core";

@Component({
    selector: "app",
    styles: [require("./app.component.scss")],
    encapsulation: ViewEncapsulation.None,
    template: `<router-outlet></router-outlet>`
})
export class AppComponent {
}