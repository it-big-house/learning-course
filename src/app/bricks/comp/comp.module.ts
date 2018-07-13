import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { NgArrayPipesModule } from 'ngx-pipes';
import { DynamicModule } from '../../../../node_modules/ng-dynamic-component';

import { ImageComponent } from './comp_image.component';
import { MultipleChoiceComponent } from './comp_multiple_choice.component';
import { SingleChoiceComponent } from './comp_single_choice.component';
import { TextComponent } from './comp_text.component';

import { getAllComponents } from './comp_index';

let dModule = DynamicModule.withComponents([SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent])

@NgModule({
    imports: [ CommonModule, FormsModule, MaterialModule, NgArrayPipesModule, dModule ],
    declarations: [ SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent ],
    exports: [ SingleChoiceComponent, MultipleChoiceComponent, ImageComponent, TextComponent,
        dModule.ngModule, FormsModule
    ],
    providers: [ dModule.providers ]
})
export class CompModule { }