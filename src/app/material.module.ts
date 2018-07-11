import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule, MatProgressSpinnerModule, MatExpansionModule,
        MatStepperModule, MatButtonToggleModule, MatCardModule],
    exports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule, MatProgressSpinnerModule, MatExpansionModule,
        MatStepperModule, MatButtonToggleModule, MatCardModule],
})
export class MaterialModule {  }