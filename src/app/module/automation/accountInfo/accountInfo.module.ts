import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountInfoComponent} from './accountInfo.component';
import {RouterModule} from "@angular/router";
import {AccountInfoRoutes} from "./accountInfo.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountInfoRoutes),
    AccountInfoComponent
  ]
})
export class AccountInfoModule {

}
