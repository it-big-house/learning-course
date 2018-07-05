import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';
import { BricksRoutingModule } from './bricks.routing';

import { BrickTimePipe } from './brickTime.pipe';

import { BricksComponent } from './bricks.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';

@NgModule({
    imports: [BricksRoutingModule, CommonModule, MaterialModule],
    declarations: [BricksComponent, IntroductionComponent, LiveComponent, BrickTimePipe],
})
export class BricksModule { }