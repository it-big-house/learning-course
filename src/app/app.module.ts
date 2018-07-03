import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router'

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { IntroductionComponent } from './bricks/introduction.component';

const appRoutes : Routes = [
  { path: "home", component: AppComponent },
  { path: "brick/:id", component: IntroductionComponent },
  { path: "", redirectTo: "/home", pathMatch: "full"}
]

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
