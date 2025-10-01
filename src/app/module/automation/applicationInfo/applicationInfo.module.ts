import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationInfoComponent} from './applicationInfo.component';
import {RouterModule} from "@angular/router";
import {ApplicationInfoRoutes} from "./applicationInfo.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApplicationInfoRoutes),
    ApplicationInfoComponent
  ]
})
export class ApplicationInfoModule {

}
