import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { BuildComponent } from './build.component';

const playRoutes = [
    { path: '', component: BuildComponent } 
]

@NgModule({
    imports: [ RouterModule.forChild(playRoutes) ],
    exports: [ RouterModule ]
})
export class BuildRoutingModule { }
