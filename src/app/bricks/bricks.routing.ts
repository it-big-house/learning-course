import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';

const bricksRoutes = [
    {path: '', component: BricksComponent, children: [
        { path: ':id/intro', component: IntroductionComponent },
        { path: ':id/live', component: LiveComponent },
        { path: ':id', redirectTo: ':id/intro', pathMatch: 'full' }
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(bricksRoutes) ],
    exports: [ RouterModule ]
})
export class BricksRoutingModule { }