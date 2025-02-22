import {Component} from '@angular/core';
import {ServerInfoComponent} from "./serverInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";

@Component({
  selector: 'app-serverInfo-add-app',
  templateUrl: './serverInfoAddApp.component.html',
  styleUrls: ['./serverInfoAddApp.component.css'],
  standalone: false
})
export class ServerInfoAddAppComponent {

  visibilityEditData = {'visibility': 'hidden'}

  appList: { id: string; name: string }[] = []; // 应用用户列表

  appSelectList: string[] = [];

  constructor(private parent: ServerInfoComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  fetchAppList() {
    let param = new URLSearchParams();
    this.httpGlobalTool.post("/api/cloud-automation/applicationInfo/queryPage", param).subscribe({
      next: (res) => {
        this.appList = res.data.records
      },
    });
  }

  doSomething() {
    this.parent.closeSidenav();
    this.parent.queryData();
    this.appSelectList = [];
  }

  doSave() {
    if (this.appSelectList != null && this.appSelectList.length > 0) {
      this.showProgressBar();
      let param = new URLSearchParams();
      this.appSelectList.forEach((app) => {
        param.append("apps", app); // 调整为同名参数
      });
      this.httpGlobalTool.post("/api/cloud-automation/serverInfo/addApp", param).subscribe({
        next: (res) => {
          this._alertService.success("批量添加成功")
          this.doSomething();
        },
        error: (e) => {
          this._alertService.error(e.error.error)
          this.hideProgressBar();
        },
        complete: () => {
          this.hideProgressBar();
        }
      });
    }
  }

  initData() {
    this.fetchAppList();
  }


  showProgressBar() {
    this.visibilityEditData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityEditData = {'visibility': 'hidden'}
  }

}
