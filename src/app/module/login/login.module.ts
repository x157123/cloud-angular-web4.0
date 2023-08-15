import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./login.routing";
import {FormsModule} from "@angular/forms";
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    FormsModule,
    CdkDrag,
    CdkDropList,
    MatExpansionModule,
    MatInputModule,
    MatGridListModule,
  ]
})
export class LoginModule { }
