import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'home';
  constructor(public afAuth: AngularFireAuth) {
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
