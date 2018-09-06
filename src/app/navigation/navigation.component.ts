import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { DatabaseService } from '../database/database.service';
import { Pallet } from '../schema';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent {
    title = 'navigation';
    pallets: Observable<Pallet[]>;

    constructor(public auth: AuthService, public database: DatabaseService, private router: Router) {
        auth.user.subscribe((user) => {
            database.getStudentPallets(user.uid).subscribe((studentPallets) => {
                this.pallets = database.getPallets(studentPallets);
            })
        })
    }
}
