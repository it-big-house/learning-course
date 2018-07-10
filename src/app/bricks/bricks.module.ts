import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { MaterialModule } from '../material.module';
import { BricksComponent } from './bricks.component';
import { BricksRoutingModule } from './bricks.routing';
import { BrickTimePipe } from './brickTime.pipe';
import { ImageComponent } from './comp/comp_image.component';
import { MultipleChoiceComponent } from './comp/comp_multiple_choice.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';



@NgModule({
    imports: [BricksRoutingModule, CommonModule, NgArrayPipesModule, MaterialModule,
        DynamicModule.withComponents([MultipleChoiceComponent, ImageComponent]),
    ],
    declarations: [
        BricksComponent, IntroductionComponent, LiveComponent, BrickTimePipe,
        MultipleChoiceComponent, ImageComponent
    ]
})
export class BricksModule { }