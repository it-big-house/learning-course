# Learning Fortress Frontend

This is a simple VLE project running using a firebase backend. It is designed as a blended learning tool for Scholar6 Schools.


## Basic Installation 
Make sure you have git, node and npm. We use Visual Studio to edit our code.
```bash
$ git clone git@github.com:Scholar-6/learning-fortress-frontend.git
$ npm install && npm run debug
```
That's it. It is preconfigured to connect to an existing firebase db in the cloud.

## Database changes
You do not have access to the firebase project web console and the dummy dev database might be corrupted or restored at anypoint. We use Firebase Firestore DB as our backend. If you just need a separate dummy backend for dev then get a free account at https://firebase.google.com/   
Create a new Cloud Firebase project, and click on 'Database' on left menu then 'Create database' under Cloud Firestore. generate a private key (Database>Project Settings>Service Accounts>Generate new private key). Move this key to /firebase/key.json in this directory.   
Install the firebase backup-restore npm package globally, and run a restore of this dummy database (see below)
```bash
$ npm install -g firestore-backup-restore
$ firestore-backup-restore --backupPath firebase/backup --restoreAccountCredentials firebase/key.json
```
https://www.npmjs.com/package/firestore-backup-restore
Finally folow the instructions in environment/environment.ts to setup the connection details from app.


## Development server

Run `ng run debug` for a dev server that reloads on changes to files. Navigate to `http://localhost:4200/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests
(More work required on developing tests)
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

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