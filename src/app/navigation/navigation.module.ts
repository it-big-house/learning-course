import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

// Components
import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [ CommonModule, FlexLayoutModule, MaterialModule, RouterModule ],
    declarations: [ NavigationComponent ],
    exports: [ NavigationComponent ]
})
export class NavigationModule { }