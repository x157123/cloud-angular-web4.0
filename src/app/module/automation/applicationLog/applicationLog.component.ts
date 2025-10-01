import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent, MatPaginatorModule} from "@angular/material/paginator";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {ApplicationLogEditComponent} from "./applicationLogEdit.component";
import {ApplicationLogViewComponent} from "./applicationLogView.component";
import {AlertService} from "@component/alert/alert.service";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CommonModule} from '@angular/common';


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-applicationLog',
  templateUrl: './applicationLog.component.html',
  styleUrls: ['./applicationLog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ApplicationLogEditComponent,
    ApplicationLogViewComponent
  ]
})
export class ApplicationLogComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','serverId','applicationId','operationType','description','createDate','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  isEditMode = true;

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

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
    this.isEditMode = true;
    if (this.drawer) {
      this.appApplicationLogEdit.clearData()
      if(id != null && id>0){
        this.appApplicationLogEdit.findById(id);
      }
      this.drawer.open().catch((error) => {
        console.error('打开抽屉出错：', error);
      });
    }
  }

  openViewSidenav(id:number) {
    this.isEditMode = false;
    this.appApplicationLogView.clearData();
    if (this.drawer && id != null && id>0) {
      this.appApplicationLogView.findById(id);
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
  serverId: string;
  applicationId: string;
  operationType: string;
  description: string;
  createDate: string;
  version: string;
}
