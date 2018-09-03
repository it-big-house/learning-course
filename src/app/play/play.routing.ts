import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayComponent } from './play.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { PalletComponent } from './home/pallet/pallet.component';

// Redirecting to default pallet
// TODO: create interfaces for multiple pallets

const playRoutes = [
    {path: '', component: PlayComponent, children: [
        {path: '', component: HomeComponent, children: [
            // { path: 'dashboard', component: DashboardComponent },
            { path: 'dashboard', redirectTo: 'pallet/bsjsJllNgYkos0w3Wrtv', pathMatch: 'full' },
            { path: 'pallet/:id', component: PalletComponent }
        ]},
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(playRoutes) ],
    exports: [ RouterModule ]
})
export class PlayRoutingModule { }
