import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage.routing';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
    imports: [ ManageRoutingModule, CommonModule, FlexLayoutModule, MaterialModule, NavigationModule ],
    declarations: [ ManageComponent ],
})
export class ManageModule { }