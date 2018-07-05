import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FortressComponent } from './fortress.component';
import { HomeComponent } from './home.component';

const fortressRoutes = [
    {path: '', component: FortressComponent, children: [
        {path: '', component: HomeComponent}
    ]}
]

@NgModule({
    imports: [ RouterModule.forChild(fortressRoutes) ],
    exports: [ RouterModule ]
})
export class FortressRoutingModule { }