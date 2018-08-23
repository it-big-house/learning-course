import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'user-type',
    template: `
    <div fxLayout="column" fxLayoutAlign="start stretch" fxLayoutGap="10px">
        <a mat-raised-button (click)="signIn(1)" class="user-type-btn">
            <img src="assets/lflogo.png" class="user-type-img">
            Student
        </a>
        <a mat-raised-button (click)="signIn(2)" class="user-type-btn">
            <img src="assets/lflogo.png" class="user-type-img rotate-180">
            Teacher
        </a>
        <a mat-raised-button (click)="signIn(3)" class="user-type-btn">
            <img src="assets/lflogo.png" class="user-type-img rotate-90">
            Builder
        </a>
    </div>
    `,
    styles: []
})
export class UserTypeComponent {
    constructor(private router: Router, private snackbar: MatSnackBar) { }

    signIn(userType: number) {
        switch(userType) {
            case 1: this.router.navigate(['signin', userType]); return;
            case 2: this.snackbar.open("Sorry, you can't log in as a teacher yet. Please log in as a student.", "", { duration: 3000 }); return;
            case 3: this.snackbar.open("Sorry, you can't log in as a builder yet. Please log in as a student.", "", { duration: 3000 }); return;
            default: this.snackbar.open("This option is invalid."); return;
        }
    }
}
