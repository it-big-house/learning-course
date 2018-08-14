import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "firebase";
import { Observable } from "rxjs";
import { FirebaseUISignInSuccessWithAuthResult, FirebaseUISignInFailure } from "firebaseui-angular";
import { environment } from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user: Observable<User>;

    constructor(public afAuth: AngularFireAuth) {
        this.user = afAuth.user;
    }

    signInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
        if (event.authResult.additionalUserInfo.isNewUser) {
          this.afAuth.auth.signOut();
          return true;
        }
        console.log(`signed in as ${event.authResult.user.displayName} who is${event.authResult.additionalUserInfo.isNewUser?"":" not"} a new user.`);
        return true;
    }

    signInFailure(event: FirebaseUISignInFailure) {
        console.log(`sign in failed because ${event.code}`);
        return true;
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}