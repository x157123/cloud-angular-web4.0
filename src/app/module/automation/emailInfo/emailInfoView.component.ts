import {Component} from '@angular/core';
import {EmailInfoComponent} from "./emailInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-emailInfo-view',
  templateUrl: './emailInfoView.component.html',
  styleUrls: ['./emailInfoView.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ]
})
export class EmailInfoViewComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  constructor(private parent: EmailInfoComponent,private httpGlobalTool: HttpGlobalTool,
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
    this.httpGlobalTool.get("/api/cloud-automation/emailInfo/findById?id="+id).subscribe({
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
    password: '',
    emailServerAddress: '',
    emailType: '',
    isActive: '',
    remarks: '',
    version: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  name: string;
  password: string;
  emailServerAddress: string;
  emailType: string;
  isActive: string;
  remarks: string;
  version: string;
}

