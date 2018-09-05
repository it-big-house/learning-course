import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatIconModule } from '@angular/material/icon';
import { BrickRoutingModule } from './brick.routing';
import { CompModule } from './comp/comp.module';

import { BrickComponent } from './brick.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';

import { BrickTimePipe } from './brickTime.pipe';
import { QuestionComponent } from './question.component';
import { DragulaModule } from 'ng2-dragula';
import { NgArrayPipesModule } from 'ngx-pipes';
import { SummaryComponent } from './summary.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewComponent } from './review.component';
import { EndingComponent } from './ending.component';
import { TimerComponent } from './timer.component';

@NgModule({
    imports: [ BrickRoutingModule, CommonModule, MaterialModule, MatIconModule, DragulaModule, CompModule, NgArrayPipesModule, FlexLayoutModule ],
    declarations: [
        BrickComponent, TimerComponent, IntroductionComponent, LiveComponent, QuestionComponent, SummaryComponent, ReviewComponent, EndingComponent, BrickTimePipe
    ],
    providers: [
        BrickTimePipe
    ]
})
export class BrickModule { }
