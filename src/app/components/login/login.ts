import {Component} from "@angular/core";
import {
    FormGroup,
    FormBuilder,
    Validators,
} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: "login",
    styles: [require("./login.scss")],
    template: require("./login.html")
})
export class LoginComponent {
    loginFormModel: FormGroup;
    wasLoginError: boolean;

    constructor(private authService: AuthService, private router: Router) {
        const fb = new FormBuilder();
        this.loginFormModel = fb.group({
            "username": [null, Validators.required],
            "password": [null, Validators.required],
        });
        this.loginFormModel.valueChanges.subscribe(data => this.wasLoginError = false);
    }

    onLogin() {
        if (this.loginFormModel.valid) {
            this.authService
                .login(this.loginFormModel.value.username, this.loginFormModel.value.password)
                .subscribe(
                    (user) => {this.router.navigate(["/app"]); },
                    (err) => this.wasLoginError = true
                );
        } else {
            this.wasLoginError = true;
        }
    }
}
