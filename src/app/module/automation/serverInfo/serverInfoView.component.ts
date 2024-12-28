import {Component} from '@angular/core';
import {ServerInfoComponent} from "./serverInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";

@Component({
  selector: 'app-serverInfo-view',
  templateUrl: './serverInfoView.component.html',
  styleUrls: ['./serverInfoView.component.css'],
  standalone: false
})
export class ServerInfoViewComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  constructor(private parent: ServerInfoComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  doSomething() {
    this.parent.closeSidenav();
    this.dataElement = {... this.defDataElement}
  }

  clearData(show?:boolean){
    this.dataElement = this.defDataElement
  }

  findById(id:Number){
    this.httpGlobalTool.get("/api/cloud-automation/serverInfo/findById?id="+id).subscribe({
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
    company: '',
    sourceAccount: '',
    name: '',
    ipAddress: '',
    username: '',
    password: '',
    os: '',
    cpuUsage: '',
    memorySize: '',
    memoryAvailable: '',
    diskSize: '',
    diskAvailable: '',
    location: '',
    expiryDate: '',
    status: '',
    version: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  company: string;
  sourceAccount: string;
  name: string;
  ipAddress: string;
  username: string;
  password: string;
  os: string;
  cpuUsage: string;
  memorySize: string;
  memoryAvailable: string;
  diskSize: string;
  diskAvailable: string;
  location: string;
  expiryDate: string;
  status: string;
  version: string;
}

