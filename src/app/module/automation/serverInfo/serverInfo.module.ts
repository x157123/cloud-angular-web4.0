import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ServerInfoRoutes} from "./serverInfo.routing";
import {ServerInfoComponent} from './serverInfo.component';
import {ServerInfoEditComponent} from "./serverInfoEdit.component";
import {ServerInfoViewComponent} from "./serverInfoView.component";
import {ServerInfoAddAppComponent} from "./serverInfoAddApp.component";
import {ServerInfoRunAppComponent} from "./serverInfoRunApp.component";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ServerInfoRoutes),
    ServerInfoComponent,
    ServerInfoEditComponent,
    ServerInfoViewComponent,
    ServerInfoAddAppComponent,
    ServerInfoRunAppComponent
  ]
})
export class ServerInfoModule {

}
