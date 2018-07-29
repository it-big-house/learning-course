import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { BricksRoutingModule } from './bricks.routing';
import { CompModule } from './comp/comp.module';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';

import { BrickTimePipe } from './brickTime.pipe';
import { QuestionComponent } from './question.component';

@NgModule({
    imports: [ BricksRoutingModule, CommonModule, MaterialModule, CompModule ],
    declarations: [
        BricksComponent, IntroductionComponent, LiveComponent, QuestionComponent, BrickTimePipe
    ],
    providers: [
        BrickTimePipe
    ]
})
export class BricksModule { }