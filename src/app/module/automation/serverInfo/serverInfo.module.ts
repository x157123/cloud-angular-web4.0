import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServerInfoComponent} from './serverInfo.component';
import {RouterModule} from "@angular/router";
import {ServerInfoRoutes} from "./serverInfo.routing";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ServerInfoEditComponent} from "./serverInfoEdit.component";
import {ServerInfoViewComponent} from "./serverInfoView.component";
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {ServerInfoAddAppComponent} from "./serverInfoAddApp.component";
import {ServerInfoRunAppComponent} from "./serverInfoRunApp.component";
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
    declarations: [
      ServerInfoComponent,
      ServerInfoEditComponent,
      ServerInfoViewComponent,
      ServerInfoAddAppComponent,
      ServerInfoRunAppComponent
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
    RouterModule.forChild(ServerInfoRoutes),
    MatTabsModule,
  ]
})
export class ServerInfoModule {

}
