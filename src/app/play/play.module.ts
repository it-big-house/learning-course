import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard.component';
import { PlayComponent } from './play.component';
import { PlayRoutingModule } from './play.routing';
import { HomeComponent } from './home.component';
import { PalletComponent } from './pallet.component';



@NgModule({
    imports: [PlayRoutingModule, CommonModule, FlexLayoutModule, MaterialModule],
    declarations: [PlayComponent, HomeComponent, DashboardComponent, PalletComponent],
})
export class PlayModule { }