import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {RouterModule} from "@angular/router";
import {IndexRoutes} from "./index.routing";
import {EditComponent} from "./edit.component";


@NgModule({
    declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(IndexRoutes),
    IndexComponent,
    EditComponent
  ]
})
export class IndexModule {

}
