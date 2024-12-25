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
  displayedColumns: string[] = ['id','company','sourceAccount','name','ipAddress','username','password','os','cpuUsage','memorySize','memoryAvailable','diskSize','diskAvailable','location','expiryDate','status','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;
  @ViewChild('drawerView', {static: false}) drawerView!: MatDrawer;

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
    if (this.drawer) {
      this.appServerInfoEdit.clearData()
      if(id != null && id>0){
        this.appServerInfoEdit.findById(id);
      }
      this.drawer.open();
    }
  }

  openViewSidenav(id:number) {
    if (this.drawerView && id != null && id>0) {
      this.appServerInfoView.findById(id);
      this.drawerView.open();
    }
  }

  closeEditSidenav() {
    if (this.drawer) {
      this.drawer.close();
    }
    if (this.drawerView) {
      this.drawerView.close();
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