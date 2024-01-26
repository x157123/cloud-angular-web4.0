import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserComponent} from './user.component';
import {RouterModule} from "@angular/router";
import {UserRoutes} from "./user.routing";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    RouterModule.forChild(UserRoutes),
    MatButtonToggleModule,
    UserComponent,
  ]
})
export class UserModule {

}
