import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexComponent} from './index.component';
import {RouterModule} from "@angular/router";
import {IndexRoutes} from "./index.routing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {EditComponent} from "./edit.component";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
    declarations: [
        IndexComponent,
        EditComponent
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
        RouterModule.forChild(IndexRoutes),
        MatCardModule,
        MatProgressBarModule,
        MatGridListModule,
        FormsModule,
        MatTooltipModule,
    ]
})
export class IndexModule {

}
