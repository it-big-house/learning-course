import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgArrayPipesModule } from 'ngx-pipes';
import { DynamicModule } from 'ng-dynamic-component';

import { ImageComponent } from './comp_image.component';
import { MultipleChoiceComponent } from './comp_multiple_choice.component';
import { SingleChoiceComponent } from './comp_single_choice.component';
import { TextComponent } from './comp_text.component';

import { getAllComponents } from './comp_index';
import { CompComponent } from './comp.component';
import { OrderComponent } from './comp_order.component';
import { DragulaModule } from 'node_modules/ng2-dragula';

let dModule = DynamicModule.withComponents([SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent])
console.log(dModule.ngModule)


@NgModule({
    imports: [ CommonModule, FormsModule, DragulaModule, MaterialModule, NgArrayPipesModule, dModule ],
    declarations: [ CompComponent, SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent ],
    exports: [ CompComponent, SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent, OrderComponent,
        dModule.ngModule, FormsModule
    ],
    providers: [ dModule.providers ]
})
export class CompModule { }