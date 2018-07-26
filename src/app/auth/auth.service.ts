import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "firebase";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User>;

    constructor(public afAuth: AngularFireAuth) {
        this.user = afAuth.user;
        this.user.subscribe((user) => {
            console.log(user.email);
        })
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}