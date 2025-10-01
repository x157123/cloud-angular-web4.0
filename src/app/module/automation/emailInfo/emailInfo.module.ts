import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailInfoComponent} from './emailInfo.component';
import {RouterModule} from "@angular/router";
import {EmailInfoRoutes} from "./emailInfo.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmailInfoRoutes),
    EmailInfoComponent
  ]
})
export class EmailInfoModule {

}
