import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { PlayComponent } from './play.component';
import { PalletComponent } from './pallet/pallet.component';
//https://stackoverflow.com/questions/50374284/angular2-shared-component-thats-used-for-routing
import { NavigationComponent } from '../navigation/navigation.component';

const routes = [
    { path: '', component: PlayComponent, children: [
        { path: '', component: NavigationComponent, children: [
            // Redirecting to default pallet
            // { path: 'dashboard', component: DashboardComponent },
            { path: 'dashboard', redirectTo: 'pallet/bsjsJllNgYkos0w3Wrtv', pathMatch: 'full' },
            { path: 'pallet/:id', component: PalletComponent }
        ]},
        { path: 'brick', loadChildren: "./brick/brick.module#BrickModule" }
    ]} 
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PlayRoutingModule { }