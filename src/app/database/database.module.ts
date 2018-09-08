import { NgModule } from '@angular/core';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { DatabaseService } from './database.service';

@NgModule({
    imports: [
        AngularFirestoreModule
    ],
    exports: [
        AngularFirestoreModule
    ],
    providers: [
        DatabaseService
    ]
})
export class DatabaseModule { }
