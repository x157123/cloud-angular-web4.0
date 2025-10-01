import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlowableTaskComponent} from './flowableTask.component';
import {RouterModule} from "@angular/router";
import {FlowableTaskRoutes} from "./flowableTask.routing";
import {FlowableTaskEditComponent} from "./flowableTaskEdit.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FlowableTaskRoutes),
    FlowableTaskComponent,
    FlowableTaskEditComponent
  ]
})
export class FlowableTaskModule {

}
