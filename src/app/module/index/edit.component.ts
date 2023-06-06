import {Component} from '@angular/core';
import {IndexComponent} from "./index.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@alert/alert.service";

@Component({
  selector: 'app-index-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {

  visibilityEditData = { 'visibility': 'hidden'}

  constructor(private parent: IndexComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  doSomething() {
    this.parent.closeSidenav();
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    this.httpGlobalTool.postBody("/api/site/save", this.dataElement).subscribe({
      next: (res) => {
        this._alertService.success("成功")
        this.dataElement = this.defDataElement
        this.doSomething();
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete:()=>{
        this.hideProgressBar();
        this.dataElement = JSON.parse(JSON.stringify(this.defDataElement));
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
    siteName: '',
    loginBg: '',
    siteSubName: '',
    sitePath: ''
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: number;
  siteName: string;
  loginBg: string;
  siteSubName: string;
  sitePath: string;
}

