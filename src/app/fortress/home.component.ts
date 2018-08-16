import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { Pallet } from '../bricks';
import { Observable } from 'rxjs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    title = 'home';
    pallets: Observable<Pallet[]>;

    constructor(public auth: AuthService, public database: DatabaseService) {
        auth.user.subscribe((user) => {
            database.getStudentPallets(user.uid).subscribe((studentPallets) => {
                this.pallets = database.getPallets(studentPallets);
            })
        })
    }

    logout() {
        this.auth.logout();
    }
}
