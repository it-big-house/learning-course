import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';
import { SummaryComponent } from './summary.component';
import { ReviewComponent } from './review.component';
import { EndingComponent } from './ending.component';

const bricksRoutes = [
    {path: ':id', component: BricksComponent, children: [
        { path: 'intro', component: IntroductionComponent },
        { path: 'live', component: LiveComponent },
        { path: 'summary', component: SummaryComponent },
        { path: 'review', component: ReviewComponent },
        { path: 'ending', component: EndingComponent },
        { path: '', redirectTo: 'intro', pathMatch: 'full' }
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(bricksRoutes) ],
    exports: [ RouterModule ]
})
export class BricksRoutingModule { }
