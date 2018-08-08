# LearningFortressFrontend

This is a simple VLE project running using a firebase backend.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Firebase User blocking signup
We have used a cloud function in Firebase to block user signups. This is apparently the only way to do it with firebase UI at the moment
https://github.com/firebase/firebaseui-web/issues/99
The user can still signup but they cannot access the app until their account has been enabled in the firebase console.

You need to create a new directory locally, then use the code below and the cloud functions starter guide to implement this from the local machine. https://firebase.google.com/docs/functions/get-started?authuser=0

```javascript
const functions = require('firebase-functions'); 
 
const admin = require("firebase-admin"); 
admin.initializeApp(); 
 
exports.blockSignup = functions.auth.user().onCreate(event => { 
  // console.log(event); 
  //if (!event.emailVerified) 
    return admin.auth().updateUser(event.uid, { disabled: true }) 
      .then(userRecord => console.log("Auto blocked user", userRecord.toJSON()))
      .catch(error => console.log("Error auto blocking:", error)); 
});
```