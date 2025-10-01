import {Component} from '@angular/core';
import {ApplicationInfoComponent} from "./applicationInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-applicationInfo-view',
  templateUrl: './applicationInfoView.component.html',
  styleUrls: ['./applicationInfoView.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class ApplicationInfoViewComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  constructor(private parent: ApplicationInfoComponent,private httpGlobalTool: HttpGlobalTool,
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
    this.httpGlobalTool.get("/api/cloud-automation/applicationInfo/findById?id="+id).subscribe({
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
    name: '',
    script: '',
    scriptUrl: '',
    scriptPath: '',
    icon: '',
    version: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  name: string;
  script: string;
  scriptUrl: string;
  scriptPath: string;
  icon: string;
  version: string;
}

