import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlowableInitiateTaskComponent} from './flowableInitiateTask.component';
import {RouterModule} from "@angular/router";
import {FlowableInitiateTaskRoutes} from "./flowableInitiateTask.routing";
import {FlowableInitiateTaskEditComponent} from "./flowableInitiateTaskEdit.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FlowableInitiateTaskRoutes),
    FlowableInitiateTaskComponent,
    FlowableInitiateTaskEditComponent
  ]
})
export class FlowableInitiateTaskModule {

}
