// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase:
    // From your project page on Firebase click the little cog top left then 'Project settings'
    {
        // Project ID
        projectId: "learning-fortress-dev",
        // Web API Key
        apiKey: "AIzaSyDMaRdWEVVJ_m6XZfhqCGP0O8adcZLvxW4",
        // <project ID>.firebaseapp.com
        authDomain: "learning-fortress-dev.firebaseapp.com",
        // <project ID>.appspot.com
        storageBucket: "learning-fortress-dev.appspot.com",
        // https://<project ID>.firebaseio.com
        databaseURL: "https://learning-fortress-dev.firebaseio.com",
        // Click on the next tab 'Cloud Messaging' and look for the 'Sender ID' section
        messagingSenderId: "890224168065"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
