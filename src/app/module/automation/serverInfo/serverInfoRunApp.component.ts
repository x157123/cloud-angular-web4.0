import {Component} from '@angular/core';
import {ServerInfoComponent} from "./serverInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";

@Component({
  selector: 'app-serverInfo-run-app',
  templateUrl: './serverInfoRunApp.component.html',
  styleUrls: ['./serverInfoRunApp.component.css'],
  standalone: false
})
export class ServerInfoRunAppComponent {

  visibilityEditData = {'visibility': 'hidden'}

  appList: { id: string; name: string }[] = []; // 应用用户列表

  appSelectList: string[] = [];

  private intervalId?: number;

  constructor(private parent: ServerInfoComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  value = 0; // 当前值
  total = 1; // 总值
  proportion: number = 0;

  startKey: string = '';

  ipAddress: string = '';
  applicationInfoId: string = '';
  appState: string = '';
  sourceAccount: string = '';

  fetchAppList() {
    let param = new URLSearchParams();
    this.httpGlobalTool.post("/api/cloud-automation/applicationInfo/queryPage", param).subscribe({
      next: (res) => {
        this.appList = res.data.records
      },
    });
  }


  getRunState() {
    let param = new URLSearchParams();
    param.append("startKey", this.startKey);
    this.httpGlobalTool.post("/api/cloud-automation/serverInfo/getRunState", param).subscribe({
      next: (res) => {
        this.total = res.data.count;
        this.value = res.data.value;
        this.proportion = (this.value / this.total) * 100
      },
    });
  }

  generateRandomString(): void {
    const length = 10; // 字符串长度
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // 可选字符集
    this.startKey = Array.from({ length }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
  }

  doSomething() {
    this.parent.closeSidenav();
    this.parent.queryData();
    this.appSelectList = [];
  }

  doSave() {
    if (this.appSelectList != null && this.appSelectList.length > 0) {
      this.showProgressBar();
      this.generateRandomString();
      let param = new URLSearchParams();
      this.appSelectList.forEach((app) => {
        param.append("apps", app); // 调整为同名参数
      });
      param.set('ipAddress', String(this.ipAddress));
      param.set('applicationInfoId', String(this.applicationInfoId));
      param.set('appState', String(this.appState));
      param.set('sourceAccount', String(this.sourceAccount));
      param.append("startKey", this.startKey);

      this.httpGlobalTool.post("/api/cloud-automation/serverInfo/runApp", param).subscribe({
        next: (res) => {
          this._alertService.success("批量执行任务成功")
          // this.doSomething();
          this.total = 1;
          this.value = 0;
          this.proportion = 0
        },
        error: (e) => {
          this._alertService.error(e.error.error)
          this.hideProgressBar();
        },
        complete: () => {
          this.hideProgressBar();
        }
      });

      this.intervalId = window.setInterval(() => {
        this.getRunState();
        if (this.total == this.value) {
          this.clearTimer();
        }
      }, 1000);
    }
  }

  initData(appState: string, applicationInfoId: string, sourceAccount: string, ipAddress: string) {
    this.applicationInfoId = applicationInfoId;
    this.ipAddress = ipAddress;
    this.appState = appState;
    this.sourceAccount = sourceAccount;
    this.fetchAppList();
  }

  ngOnDestroy(): void {
    // 组件销毁时也要清理定时器，防止内存泄漏
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }
  showProgressBar() {
    this.visibilityEditData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityEditData = {'visibility': 'hidden'}
  }

}
