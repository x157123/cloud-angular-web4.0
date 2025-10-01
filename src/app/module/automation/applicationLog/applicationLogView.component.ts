import {Component} from '@angular/core';
import {ApplicationLogComponent} from "./applicationLog.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-applicationLog-view',
  templateUrl: './applicationLogView.component.html',
  styleUrls: ['./applicationLogView.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class ApplicationLogViewComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  constructor(private parent: ApplicationLogComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.dataElement = {... this.defDataElement}
  }

  clearData(show?:boolean){
    this.dataElement = this.defDataElement
  }

  findById(id:Number){
    this.httpGlobalTool.get("/api/cloud-automation/applicationLog/findById?id="+id).subscribe({
      next: (res) => {
        this.dataElement = res.data
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete:()=>{
        this.hideProgressBar();
      }
    });
  }

  showProgressBar(){
    this.visibilityEditData = { 'visibility': 'visible'}
  }
  hideProgressBar(){
    this.visibilityEditData = { 'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    id: '',
    serverId: '',
    applicationId: '',
    operationType: '',
    description: '',
    version: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  serverId: string;
  applicationId: string;
  operationType: string;
  description: string;
  version: string;
}

