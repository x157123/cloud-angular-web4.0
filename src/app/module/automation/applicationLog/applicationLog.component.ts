import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {ApplicationLogEditComponent} from "./applicationLogEdit.component";
import {ApplicationLogViewComponent} from "./applicationLogView.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-applicationLog',
  templateUrl: './applicationLog.component.html',
  styleUrls: ['./applicationLog.component.css'],
  standalone: false
})
export class ApplicationLogComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','serverId','applicationId','operationType','description','updateTime','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;
  @ViewChild('drawerView', {static: false}) drawerView!: MatDrawer;

  @ViewChild('appApplicationLogEdit', {static: false}) appApplicationLogEdit!: ApplicationLogEditComponent;
  @ViewChild('appApplicationLogView', {static: false}) appApplicationLogView!: ApplicationLogViewComponent;

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
  delById(id:number) {
    if(id != null && id>0){
      let param = new URLSearchParams();
      param.set('ids', String(id));
      this.httpGlobalTool.post("/api/cloud-automation/applicationLog/removeByIds",param).subscribe({
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
      this.appApplicationLogEdit.clearData()
      if(id != null && id>0){
        this.appApplicationLogEdit.findById(id);
      }
      this.drawer.open();
    }
  }

  openViewSidenav(id:number) {
    if (this.drawerView && id != null && id>0) {
      this.appApplicationLogView.findById(id);
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
  serverId: string;
  applicationId: string;
  operationType: string;
  description: string;
  version: string;
}