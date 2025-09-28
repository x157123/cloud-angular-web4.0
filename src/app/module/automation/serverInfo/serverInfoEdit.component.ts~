import {Component} from '@angular/core';
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

  visibilityEditData = {'visibility': 'hidden'}

  accountList: { id: string; username: string }[] = []; // 存储用户列表
  appList: { id: string; name: string }[] = []; // 应用用户列表

  accountSelectList: { id: string; username: string }[] = []; // 已选择用户列表
  appSelectList: { id: string; name: string }[] = []; // 已选择应用列表

  constructor(private parent: ServerInfoComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  // 调用接口获取用户列表
  fetchUserList(id?: Number): void {
    let param = new URLSearchParams();
    param.set('binding', "0");
    this.httpGlobalTool.post("/api/cloud-automation/accountInfo/queryPage", param).subscribe({
      next: (res) => {
        this.accountList = res.data.records
      }
    });
  }

  fetchAppList(id?: Number) {
    let param = new URLSearchParams();
    if(id){
      param.set('serverId', String(id));
      param.set('binding', "0");
    }
    this.httpGlobalTool.post("/api/cloud-automation/applicationInfo/queryPage", param).subscribe({
      next: (res) => {
        this.appList = res.data.records
      },
    });
  }

  doSomething() {
    this.parent.closeSidenav();
    this.parent.queryData()
    this.dataElement = {...this.defDataElement}
  }

  doSave() {
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
      complete: () => {
        this.hideProgressBar();
        this.clearData()
      }
    });
  }

  clearData() {
    this.dataElement = this.defDataElement
  }

  initData(id?: Number){
    this.fetchUserList(id);
    this.fetchAppList(id);
  }

  findById(id: Number) {
    this.httpGlobalTool.get("/api/cloud-automation/serverInfo/findById?id=" + id).subscribe({
      next: (res) => {
        this.initData(id);
        this.dataElement = res.data
        const { accountInfoVoList, applicationInfoVoList } = res.data;
        // 使用 Map 保证 id 唯一
        const mergedAccountMap = new Map<string, { id: string; username: string }>();
        const mergedAppMap = new Map<string, { id: string; name: string }>();

        // 处理 accountInfoVoList
        if (Array.isArray(accountInfoVoList)) {
          this.accountSelectList = accountInfoVoList.map(account => ({
            id: account.id, // 确保类型
            username: account.username,
          }));
          this.accountList.forEach(account => {
            mergedAccountMap.set(account.id, account);
          });
          this.accountSelectList.forEach(account => {
            mergedAccountMap.set(account.id, account);
          });
          this.dataElement.accountInfoIds = this.accountSelectList.map(account => account.id);
        }

        // 处理 applicationInfoVoList
        if (Array.isArray(applicationInfoVoList)) {
          this.appSelectList = applicationInfoVoList.map(application => ({
            id: application.id, // 确保类型为
            name: application.name,
          }));
          // 将 accountSelectList 添加到 Map 中，覆盖重复的 id
          this.appSelectList.forEach(account => {
            mergedAppMap.set(account.id, account);
          });
          this.appList.forEach(account => {
            mergedAppMap.set(account.id, account);
          });
          this.dataElement.applicationInfoIds = this.appSelectList.map(account => account.id);
        }
        this.accountList = Array.from(mergedAccountMap.values());
        this.appList = Array.from(mergedAppMap.values());
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

  showProgressBar() {
    this.visibilityEditData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityEditData = {'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    id: '',
    company: '',
    sourceAccount: '',
    name: '',
    ipAddress: '',
    port: 0,
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
    accountInfoIds: [],
    applicationInfoIds: [],
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  id?: string;
  company: string;
  sourceAccount: string;
  name: string;
  ipAddress: string;
  port: number;
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
  accountInfoIds: string[];
  applicationInfoIds: string[];
}

