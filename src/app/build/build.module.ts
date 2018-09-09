import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { BuildComponent } from './build.component';
import { BuildRoutingModule } from './build.routing';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
    imports: [ BuildRoutingModule, CommonModule, FlexLayoutModule, MaterialModule, NavigationModule ],
    declarations: [ BuildComponent ],
})
export class BuildModule { }