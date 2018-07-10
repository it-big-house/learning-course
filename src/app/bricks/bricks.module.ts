import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgArrayPipesModule } from 'ngx-pipes';

import { MaterialModule } from '../material.module';
import { BricksRoutingModule } from './bricks.routing';

import { BrickTimePipe } from './brickTime.pipe';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';
import { CompComponent } from './comp/comp.component';
import { MultipleChoiceComponent } from './comp/comp_multiple_choice.component';

import { CompDirective } from './comp/comp.directive';

@NgModule({
    imports: [BricksRoutingModule, CommonModule, NgArrayPipesModule, MaterialModule],
    declarations: [
        BricksComponent, IntroductionComponent, LiveComponent, BrickTimePipe,
        CompComponent, MultipleChoiceComponent, CompDirective
    ],
})
export class BricksModule { }