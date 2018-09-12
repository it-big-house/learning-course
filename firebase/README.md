
As we are using the Firestore db we need to set some security rules in the backend

https://firebase.google.com/docs/firestore/security/get-started

```bash
// Allow read/write access on all documents to any user signed in to the application
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

We also have a cloud script if we want to lock down new users from accessing the site. We have opened this up for the moment.

## Firebase User blocking signup
This is apparently the only way to block new users with firebase UI at the moment
https://github.com/firebase/firebaseui-web/issues/99
The user can still signup but they cannot access the app until their account has been enabled in the firebase console.

You need to create a new directory locally, then use the code below and the cloud functions starter guide to implement this from the local machine. https://firebase.google.com/docs/functions/get-started?authuser=0
Make sure to uncomment the relevant function in firebase/firebase-functions/functions/index.js

```bash
$ cd firebase/firebase-functions/functions
$ npm install -g firebase-tools
$ npm install
$ firebase login
$ firebase deploy --only functions
```

We also need to redirect new users so they don't auto login after signup
```javascript
signInSuccess(event: FirebaseUISignInSuccessWithAuthResult) {
        if (event.authResult.additionalUserInfo.isNewUser) {
          this.afAuth.auth.signOut();
          return true;
        }
        console.log(`signed in as ${event.authResult.user.displayName} who is${event.authResult.additionalUserInfo.isNewUser?"":" not"} a new user.`);
        return true;
    }
```
