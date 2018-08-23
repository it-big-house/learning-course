import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FortressComponent } from './fortress.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { PalletComponent } from './pallet.component';

const fortressRoutes = [
    {path: '', component: FortressComponent, children: [
        {path: '', component: HomeComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pallet/:id', component: PalletComponent },
            { path: '', redirectTo: '/fortress/dashboard', pathMatch: 'full' }
        ]}
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(fortressRoutes) ],
    exports: [ RouterModule ]
})
export class FortressRoutingModule { }
