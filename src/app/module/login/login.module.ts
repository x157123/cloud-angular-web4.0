import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./login.routing";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    LoginComponent
  ]
})
export class LoginModule { }
