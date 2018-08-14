// External Libraries
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

// Routing, Styling, Environment
import { AppRoutingModule } from './app.routing';
import { MaterialModule } from './material.module';
import { environment } from '../environments/environment';

// Modules
import { AppComponent } from './app.component';
import { FortressModule } from './fortress/fortress.module';
import { BricksModule } from './bricks/bricks.module';

import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { DatabaseModule } from './database/database.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BricksModule,
    FortressModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    DatabaseModule,
    DragulaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
