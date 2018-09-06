import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ManageComponent } from './manage.component';

const playRoutes = [
    { path: '', component: ManageComponent } 
]

@NgModule({
    imports: [ RouterModule.forChild(playRoutes) ],
    exports: [ RouterModule ]
})
export class ManageRoutingModule { }
