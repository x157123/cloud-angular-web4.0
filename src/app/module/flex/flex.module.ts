import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexComponent} from './flex.component';
import {RouterModule} from "@angular/router";
import {FlexRoutes} from "./flex.routing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {BoxComponent} from "./box";


@NgModule({
  declarations: [
    FlexComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild(FlexRoutes),
    BoxComponent,
  ]
})
export class FlexModule {

}
