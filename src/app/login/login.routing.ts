import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import { UserTypeComponent } from "./user-type.component";
import { SignInComponent } from "./sign-in.component";

const loginRoutes = [
    {path: 'usertype', component: UserTypeComponent},
    {path: 'signin/:usertype', component: SignInComponent},
    {path: '', redirectTo: 'usertype', pathMatch: 'full'}
]

@NgModule({
    imports: [ RouterModule.forChild(loginRoutes) ],
    exports: [ RouterModule ]
})
export class LoginRoutingModule { }
