import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeployRoutes} from './deploy-routing.module';
import {RouterModule} from "@angular/router";
import { DeployComponent } from "./deploy.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {EditComponent} from "./edit.component";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSelectModule} from "@angular/material/select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatListModule} from "@angular/material/list";
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule,CdkDropList,CdkDrag} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';
import {ColumnComponent} from "./column/column.component";
import { TableComponent } from './table/table.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatMenuModule} from "@angular/material/menu";
import {CdkConnectedOverlay, CdkOverlayOrigin} from "@angular/cdk/overlay";

@NgModule({
  declarations: [
    DeployComponent,
    EditComponent,
    ColumnComponent,
    TableComponent
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
    MatSidenavModule,
    MatCardModule,
    MatProgressBarModule,
    MatGridListModule,
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatListModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    DragDropModule,
    CdkDropList,
    NgFor,
    CdkDrag,
    RouterModule.forChild(DeployRoutes),
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
  ]
})
export class DeployModule { }
