import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicModule } from 'ng-dynamic-component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { MaterialModule } from '../material.module';
import { BricksComponent } from './bricks.component';
import { BricksRoutingModule } from './bricks.routing';
import { BrickTimePipe } from './brickTime.pipe';
import { ImageComponent } from './comp/comp_image.component';
import { SingleChoiceComponent } from './comp/comp_single_choice.component';
import { IntroductionComponent } from './introduction.component';
import { LiveComponent } from './live.component';
import { TextComponent } from './comp/comp_text.component';



@NgModule({
    imports: [BricksRoutingModule, CommonModule, NgArrayPipesModule, MaterialModule,
        DynamicModule.withComponents([SingleChoiceComponent, ImageComponent, TextComponent]),
    ],
    declarations: [
        BricksComponent, IntroductionComponent, LiveComponent, BrickTimePipe,
        SingleChoiceComponent, ImageComponent, TextComponent
    ]
})
export class BricksModule { }