import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { NgArrayPipesModule } from 'ngx-pipes';
import { DragulaModule } from 'node_modules/ng2-dragula';
import { MaterialModule } from '../../material.module';
import { CompComponent } from './comp.component';
import { ImageComponent } from './comp_image.component';
import { MultipleChoiceComponent } from './comp_multiple_choice.component';
import { OrderComponent } from './comp_order.component';
import { SingleChoiceComponent } from './comp_single_choice.component';
import { SortComponent } from './comp_sort.component';
import { TextComponent } from './comp_text.component';
import { ShortAnswerComponent } from './comp_short_answer.component';
import { VerticalShuffleComponent } from './comp_vertical_shuffle.component';

let dModule = DynamicModule.withComponents([SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent, SortComponent, ShortAnswerComponent, VerticalShuffleComponent])

@NgModule({
    imports: [ CommonModule, FormsModule, DragulaModule, MaterialModule, NgArrayPipesModule, dModule ],
    declarations: [ CompComponent, SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent, SortComponent, ShortAnswerComponent, VerticalShuffleComponent ],
    exports: [ CompComponent, SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent, SortComponent, ShortAnswerComponent, VerticalShuffleComponent,
        dModule.ngModule, FormsModule
    ],
    providers: [ dModule.providers ]
})
export class CompModule { }