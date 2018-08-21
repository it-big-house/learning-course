import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { FortressComponent } from './fortress.component';
import { FortressRoutingModule } from './fortress.routing';
import { HomeComponent } from './home.component';
import { PalletComponent } from './pallet.component';



@NgModule({
    imports: [FortressRoutingModule, CommonModule, FlexLayoutModule, MaterialModule],
    declarations: [FortressComponent, HomeComponent, DashboardComponent, PalletComponent],
})
export class FortressModule { }