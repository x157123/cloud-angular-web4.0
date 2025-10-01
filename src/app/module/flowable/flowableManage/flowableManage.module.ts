import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlowableManageComponent} from './flowableManage.component';
import {RouterModule} from "@angular/router";
import {FlowableManageRoutes} from "./flowableManage.routing";
import {FlowableManageEditComponent} from "./flowableManageEdit.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FlowableManageRoutes),
    FlowableManageComponent,
    FlowableManageEditComponent
  ]
})
export class FlowableManageModule {

}
