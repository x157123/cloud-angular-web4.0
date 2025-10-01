import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationLogComponent} from './applicationLog.component';
import {RouterModule} from "@angular/router";
import {ApplicationLogRoutes} from "./applicationLog.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApplicationLogRoutes),
    ApplicationLogComponent
  ]
})
export class ApplicationLogModule {

}
