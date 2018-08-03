import { FirebaseUIAuthConfig, AuthProvider, AuthMethods, CredentialHelper, FirebaseUIModule } from "firebaseui-angular";
import { AngularFireModule } from "angularfire2"
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgModule } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

// https://github.com/RaphaelJenni/FirebaseUI-Angular
const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
    providers: [
      AuthProvider.Google,
      AuthProvider.Password
    ],
    method: AuthMethods.Redirect,
    // tos: '<your-tos-link>',
    credentialHelper: CredentialHelper.AccountChooser,
    autoUpgradeAnonymousUsers: true,
    disableSignInSuccessCallback: true,
};

@NgModule({
    imports: [
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ],
    exports: [
        AngularFireAuthModule,
        FirebaseUIModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule { }