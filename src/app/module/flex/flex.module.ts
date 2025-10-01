import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexComponent} from './flex.component';
import {RouterModule} from "@angular/router";
import {FlexRoutes} from "./flex.routing";
import {BoxComponent} from "./box";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(FlexRoutes),
    FlexComponent,
    BoxComponent,
  ]
})
export class FlexModule {

}
