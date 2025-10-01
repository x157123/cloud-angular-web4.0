import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeployRoutes} from './deploy-routing.module';
import {RouterModule} from "@angular/router";
import { DeployComponent } from "./deploy.component";
import {EditComponent} from "./edit.component";
import {ColumnComponent} from "./column/column.component";
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(DeployRoutes),
    DeployComponent,
    EditComponent,
    ColumnComponent,
    TableComponent
  ]
})
export class DeployModule { }
