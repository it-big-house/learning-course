import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../node_modules/firebase';
import { Observable } from '../../node_modules/rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    user: Observable<User>

    constructor(public afAuth: AngularFireAuth) {
        
    }
}
