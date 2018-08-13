import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';
import { ReviewComponent } from './review.component';

const bricksRoutes = [
    {path: ':id', component: BricksComponent, children: [
        { path: 'intro', component: IntroductionComponent },
        { path: 'live', component: LiveComponent },
        { path: 'review', component: ReviewComponent },
        { path: '', redirectTo: 'intro', pathMatch: 'full' }
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(bricksRoutes) ],
    exports: [ RouterModule ]
})
export class BricksRoutingModule { }