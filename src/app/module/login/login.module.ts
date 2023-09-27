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
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";
import {DialogModule} from "@angular/cdk/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {CdkMenuTrigger} from "@angular/cdk/menu";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";



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
    CdkConnectedOverlay,
    DialogModule,
    CdkOverlayOrigin,
    MatMenuModule,
    CdkMenuTrigger,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
  ]
})
export class LoginModule { }
