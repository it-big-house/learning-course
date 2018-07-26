import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'home';
  constructor(public auth: AuthService) {
  }
  logout() {
    this.auth.logout();
  }
}
