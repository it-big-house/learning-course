import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { ManageComponent } from './manage.component';
import { ManageRoutingModule } from './manage.routing';
import { NavigationModule } from '../navigation/navigation.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [ ManageRoutingModule, CommonModule, FlexLayoutModule, MaterialModule, NavigationModule],
    declarations: [ ManageComponent, DashboardComponent ],
    exports: [ NavigationModule ]
})
export class ManageModule { }