import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { NavigationComponent } from '../navigation/navigation.component';
import { ManageComponent } from './manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes = [
    { path: '', component: ManageComponent, children: [
        { path: '', component: NavigationComponent, children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]}
    ]} 
]

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class ManageRoutingModule { }