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
import { DragulaModule } from 'ng2-dragula';
import { NgArrayPipesModule } from 'ngx-pipes';
import { SummaryComponent } from './summary.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [ BricksRoutingModule, CommonModule, MaterialModule, DragulaModule, CompModule, NgArrayPipesModule, FlexLayoutModule ],
    declarations: [
        BricksComponent, IntroductionComponent, LiveComponent, QuestionComponent, SummaryComponent, BrickTimePipe
    ],
    providers: [
        BrickTimePipe
    ]
})
export class BricksModule { }
