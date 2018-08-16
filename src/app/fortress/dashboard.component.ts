import { Component } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    constructor(public auth: AuthService) { }
}