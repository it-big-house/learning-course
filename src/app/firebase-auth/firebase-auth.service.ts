import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor() { }
}

import { NgModule } from '@angular/core';


// Firebase Auth Dependencies
// https://github.com/angular/angularfire2/blob/master/docs/auth/getting-started.md
import {
  AuthMethods,
  AuthProvider,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


// https://github.com/RaphaelJenni/FirebaseUI-Angular
const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
    providers: [
      AuthProvider.Google,
      AuthProvider.Twitter,
      AuthProvider.Github,
      AuthProvider.Password,
      AuthProvider.Phone
    ],
    method: AuthMethods.Redirect,
    // tos: '<your-tos-link>',
    credentialHelper: CredentialHelper.AccountChooser,
    autoUpgradeAnonymousUsers: true,
    disableSignInSuccessCallback: true
  };

@NgModule({
    declarations: [],
    imports:  [
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      FirebaseUIModule.forRoot(firebaseUiAuthConfig)
    ],
    providers: [],
    bootstrap: []
})
export class FirebaseAuthModule { 
  public static forRoot(environment: any): ModuleWithProviders {
    return {
        ngModule: FirebaseAuthModule,
        providers: []
    };
  }
}
