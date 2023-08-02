import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowableComponent } from './flowable.component';
import {RouterModule} from "@angular/router";
import {FlowableRoutes} from "./flowable.routing";
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [
    FlowableComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(FlowableRoutes),
  ]
})
export class FlowableModule { }
