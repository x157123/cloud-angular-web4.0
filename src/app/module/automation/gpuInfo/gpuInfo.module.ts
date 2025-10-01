import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GpuInfoComponent} from './gpuInfo.component';
import {RouterModule} from "@angular/router";
import {GpuInfoRoutes} from "./gpuInfo.routing";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(GpuInfoRoutes),
    GpuInfoComponent
  ]
})
export class GpuInfoModule {

}
