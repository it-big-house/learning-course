import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips'

@NgModule({
    imports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule],
    exports: [
        MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
        MatListModule, MatChipsModule],
})
export class MaterialModule {  }