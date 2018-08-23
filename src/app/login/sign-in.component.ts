import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'sign-in',
    template: `
    <firebase-ui (signInSuccessWithAuthResult)="authService.signInSuccess($event)"></firebase-ui>
    `,
    styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
    constructor(public authService: AuthService) { }
}
