import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FortressComponent } from './fortress.component';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard.component';
import { PalletComponent } from './pallet.component';

// Redirecting to default pallet
// TODO: create interfaces for multiple pallets

const fortressRoutes = [
    {path: '', component: FortressComponent, children: [
        {path: '', component: HomeComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'pallet/:id', component: PalletComponent },
            { path: '', redirectTo: '/pallet/bsjsJllNgYkos0w3Wrtv', pathMatch: 'full' }
        ]}
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(fortressRoutes) ],
    exports: [ RouterModule ]
})
export class FortressRoutingModule { }
