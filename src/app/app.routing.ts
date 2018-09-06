import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes : Routes = [
    { path: "play", loadChildren: "./play/play.module#PlayModule" },
    { path: "manage", loadChildren: "./manage/manage.module#ManageModule"},
    { path: "", redirectTo: "play/dashboard", pathMatch: "full"}
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
