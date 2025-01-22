import {Component} from '@angular/core';
import {ServerInfoComponent} from "./serverInfo.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-serverInfo-view',
  templateUrl: './serverInfoView.component.html',
  styleUrls: ['./serverInfoView.component.css'],
  standalone: false
})
export class ServerInfoViewComponent {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['applicationName', 'description', 'createDate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityEditData = {'visibility': 'hidden'}

  show: boolean = true;

  iframeUrl: SafeResourceUrl = '';

  applicationSelectId: string = '0';

  serverId: Number = 0;

  application: ApplicationType[] = [
    {value: '0', viewValue: '全部'},
  ];

  constructor(private parent: ServerInfoComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService, private sanitizer: DomSanitizer) {
  }

  doSomething() {
    this.parent.closeSidenav();
    this.dataElement = {...this.defDataElement}
  }

  clearData(show?: boolean) {
    this.dataElement = this.defDataElement
  }

  findById(id: Number) {
    this.applicationSelectId = '0';
    this.iframeUrl = '';
    this.serverId = id;
    this.application = [
      {value: '0', viewValue: '全部'}
    ];
    this.httpGlobalTool.get("/api/cloud-automation/serverInfo/findById?id=" + id).subscribe({
      next: (res) => {
        this.dataElement = res.data;
        this.queryData(id, '0');
        const newList = res.data.applicationInfoVoList.map((item: { id: any; name: any; }) => ({
          value: item.id,
          viewValue: item.name
        }));
        if (this.dataElement.status == '0') {
          const rawUrl: string = "http://" + this.dataElement.ipAddress + ":6080/vnc.html?host=" + this.dataElement.ipAddress + "&port=6080";
          this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
        }
        this.application = this.application.concat(newList);
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

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  queryLog() {
    this.queryData(this.serverId, this.applicationSelectId);
  }

  queryData(serverId?: Number, type?: string) {
    let param = new URLSearchParams();
    param.set('page', String(this.pageIndex + 1));
    param.set('rows', String(this.pageSize));
    param.set('serverId', String(serverId));
    if (type != null && type != '0') {
      param.set('applicationId', type);
    }
    this.showProgressBar()
    this.httpGlobalTool.post("/api/cloud-automation/applicationLog/queryPage", param).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res.data.records)
        this.dataLength = res.data.total
      },
      error: (e) => {
        this.hideProgressBar();
        console.log('error:', e.error)
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


export interface PeriodicElement {
  id: string;
  serverId: string;
  applicationId: string;
  operationType: string;
  description: string;
  createDate: string;
  version: string;
}

interface ApplicationType {
  value: string;
  viewValue: string;
}
