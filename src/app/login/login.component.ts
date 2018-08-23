import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-login',
    template: `
    <div class="login-body" fxLayout="column" fxLayoutAlign="center center">
        <div class="login-container" fxLayout="column" fxLayoutAlign="center center">
            <div class="login-logo">
                <img src="assets/lflogo.png" alt="lol"><br />
                <h1>Learning Fortress</h1>
            </div>
            <router-outlet></router-outlet>
        </div>
    </div>
    `,
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(public authService: AuthService) { }
}
