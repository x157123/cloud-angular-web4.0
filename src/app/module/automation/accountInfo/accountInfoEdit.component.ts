import {ChangeDetectorRef, Component} from '@angular/core';
import {AccountInfoComponent} from "./accountInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";

@Component({
  selector: 'app-accountInfo-edit',
  templateUrl: './accountInfoEdit.component.html',
  styleUrls: ['./accountInfoEdit.component.css'],
  standalone: false
})
export class AccountInfoEditComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  constructor(private parent: AccountInfoComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    this.httpGlobalTool.postBody("/api/cloud-automation/accountInfo/save", this.dataElement).subscribe({
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
    this.httpGlobalTool.get("/api/cloud-automation/accountInfo/findById?id="+id).subscribe({
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
    username: '',
    account: '',
    password: '',
    secretKey: '',
    region: '',
    accountType: '',
    isActive: '',
    remarks: '',
    email: '',
    version: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  username: string;
  account: string;
  password: string;
  secretKey: string;
  region: string;
  accountType: string;
  isActive: string;
  remarks: string;
  email: string;
  version: string;
}

