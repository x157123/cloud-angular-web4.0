import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {ServerInfoEditComponent} from "./serverInfoEdit.component";
import {ServerInfoViewComponent} from "./serverInfoView.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-serverInfo',
  templateUrl: './serverInfo.component.html',
  styleUrls: ['./serverInfo.component.css'],
  standalone: false
})
export class ServerInfoComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','company','sourceAccount','name','ipAddress','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  isEditMode = true;

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appServerInfoEdit', {static: false}) appServerInfoEdit!: ServerInfoEditComponent;
  @ViewChild('appServerInfoView', {static: false}) appServerInfoView!: ServerInfoViewComponent;

  constructor(private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService) {
  }

  ngAfterViewInit(): void {
    this.queryData()
  }

  showProgressBar() {
    this.visibilityListData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityListData = {'visibility': 'hidden'}
  }

  queryData() {
    let param = new URLSearchParams();
    param.set('page', String(this.pageIndex + 1));
    param.set('rows', String(this.pageSize));
    this.showProgressBar()
    this.httpGlobalTool.post("/api/cloud-automation/serverInfo/queryPage", param).subscribe({
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
  delById(id:number) {
    if(id != null && id>0){
      let param = new URLSearchParams();
      param.set('ids', String(id));
      this.httpGlobalTool.post("/api/cloud-automation/serverInfo/removeByIds",param).subscribe({
        next: (res) => {
          this._alertService.success("删除成功")
          this.queryData()
        },
        error: (e) => {
          this._alertService.error(e.error.error)
        },
        complete: () => {
        }
      });
    }
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.queryData();
  }

  openEditSidenav(id:number) {
    this.isEditMode = true;
    if (this.drawer) {
      this.appServerInfoEdit.clearData()
      this.appServerInfoEdit.initData(id);
      if(id != null && id>0){
        this.appServerInfoEdit.findById(id);
      }
      this.drawer.open().catch((error) => {
        console.error('打开抽屉出错：', error);
      });
    }
  }

  openViewSidenav(id:number) {
    this.isEditMode = false;
    this.appServerInfoView.clearData();
    if (this.drawer && id != null && id>0) {
      this.appServerInfoView.findById(id);
      this.drawer.open().catch((error) => {
        console.error('打开抽屉出错：', error);
      });
    }
  }

  closeEditSidenav() {
    if (this.drawer) {
      this.drawer.close().catch((error) => {
        console.error('关闭抽屉出错：', error);
      });
    }
  }

}

export interface PeriodicElement {
  id: string;
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
