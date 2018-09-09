import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BuildComponent } from './build.component';
import { NavigationComponent } from '../navigation/navigation.component';

const routes = [
    { path: '', component: BuildComponent, children: [
        { path: '', component: NavigationComponent, children: [
            // Redirecting to default pallet
            // { path: 'dashboard', component: DashboardComponent },
            // { path: 'dashboard', redirectTo: 'pallet/bsjsJllNgYkos0w3Wrtv', pathMatch: 'full' },
            // { path: 'pallet/:id', component: PalletComponent }
        ]},
        { path: 'brick', loadChildren: "./brick/brickbuild.module#BrickModule" }
    ]} 
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class BuildRoutingModule { }
