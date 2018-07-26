import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(public afAuth: AngularFireAuth) { }

    logout() {
        this.afAuth.auth.signOut();
    }
}