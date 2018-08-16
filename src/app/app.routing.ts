import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes : Routes = [
    { path: "fortress", loadChildren: "./fortress/fortress.module#FortressModule" },
    { path: "bricks", loadChildren: "./bricks/bricks.module#BricksModule" },
    { path: "", redirectTo: "/fortress/dashboard", pathMatch: "full"}
]

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        ),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
