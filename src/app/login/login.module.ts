import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login.routing";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from "./login.component";
import { UserTypeComponent } from "./user-type.component";
import { SignInComponent } from "./sign-in.component";
import { AuthModule } from "../auth/auth.module";
import { MaterialModule } from "../material.module";

@NgModule({
    imports: [ CommonModule, FlexLayoutModule, MaterialModule, LoginRoutingModule, AuthModule ],
    declarations: [ LoginComponent, UserTypeComponent, SignInComponent ],
    exports: [ LoginComponent ]
})
export class LoginModule { }
