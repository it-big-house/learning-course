// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase:
    {
        apiKey: "AIzaSyDZAppRL0CfjhcMo4-9l0DIIRdDXXexvx4",
        authDomain: "learning-fortress.firebaseapp.com",
        databaseURL: "https://learning-fortress.firebaseio.com",
        projectId: "learning-fortress",
        storageBucket: "learning-fortress.appspot.com",
        messagingSenderId: "45503831861"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
