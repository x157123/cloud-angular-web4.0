import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {HelpRoutes} from "./help.routing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {DynamicFormComponent} from "./dynamic-form.component";
import {DynamicFormQuestionComponent} from "./dynamic-form-question.component";
import {HelpComponent} from "./help.component";

@NgModule({
  imports: [
    ReactiveFormsModule,
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
    RouterModule.forChild(HelpRoutes),
    ReactiveFormsModule,
  ],
  declarations: [HelpComponent, DynamicFormComponent, DynamicFormQuestionComponent ],
})
export class HelpModule {

}
