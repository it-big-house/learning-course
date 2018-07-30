import { FirebaseUIAuthConfig, AuthProvider, AuthMethods, CredentialHelper, FirebaseUIModule } from "firebaseui-angular";
import { AngularFireModule } from "angularfire2"
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgModule } from "@angular/core";
import { environment } from "../../environments/environment";


// https://github.com/RaphaelJenni/FirebaseUI-Angular
const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
    providers: [
      AuthProvider.Google,
      AuthProvider.Facebook,
      AuthProvider.Password,
      AuthProvider.Phone
    ],
    method: AuthMethods.Redirect,
    // tos: '<your-tos-link>',
    credentialHelper: CredentialHelper.AccountChooser,
    autoUpgradeAnonymousUsers: true,
    disableSignInSuccessCallback: true,
};

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ],
    exports: [
        AngularFireModule,
        AngularFireAuthModule,
        FirebaseUIModule
    ]
})
export class AuthModule { }