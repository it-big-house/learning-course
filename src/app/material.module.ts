import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule, MatProgressSpinnerModule, MatExpansionModule],
    exports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule, MatProgressSpinnerModule, MatExpansionModule],
})
export class MaterialModule {  }