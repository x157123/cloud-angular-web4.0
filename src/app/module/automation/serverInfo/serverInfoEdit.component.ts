import {ChangeDetectorRef, Component} from '@angular/core';
import {ServerInfoComponent} from "./serverInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";

@Component({
  selector: 'app-serverInfo-edit',
  templateUrl: './serverInfoEdit.component.html',
  styleUrls: ['./serverInfoEdit.component.css'],
  standalone: false
})
export class ServerInfoEditComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  userList: string[] = ['user1', 'user2', 'user3', 'user4', 'user5'];
  appList: string[] = ['app1', 'app2', 'app3', 'app4', 'app5'];

  constructor(private parent: ServerInfoComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    this.httpGlobalTool.postBody("/api/cloud-automation/serverInfo/save", this.dataElement).subscribe({
      next: (res) => {
        this._alertService.success("保存成功")
        this.doSomething();
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete:()=>{
        this.hideProgressBar();
        this.clearData()
      }
    });
  }

  clearData(){
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
    users: '',
    apps: '',
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
  users: string;
  apps: string;
}

