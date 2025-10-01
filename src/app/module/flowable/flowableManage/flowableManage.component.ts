import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent, MatPaginatorModule} from "@angular/material/paginator";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {FlowableManageEditComponent} from "./flowableManageEdit.component";
import {AlertService} from "@component/alert/alert.service";
import { ActivatedRoute } from '@angular/router';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-flowableManage',
    templateUrl: './flowableManage.component.html',
    styleUrls: ['./flowableManage.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        FlowableManageEditComponent
    ]
})
export class FlowableManageComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','processName','key','createTime','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  keyword: string = '';
  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appFlowableManageEdit', {static: false}) appFlowableManageEdit!: FlowableManageEditComponent;

  constructor(private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,
              private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
    });
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
    this.httpGlobalTool.post("/api/flowable/getDeployment", param).subscribe({
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
    if(id != null){
      let param = new URLSearchParams();
      param.set('deployId', String(id));
      this.httpGlobalTool.post("/api/flowable/deleteDeployment",param).subscribe({
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

  openEditSidenav(id:number,show?:boolean) {
    if (this.drawer) {
      this.appFlowableManageEdit.clearData()
      if(id != null && id>0){
        this.appFlowableManageEdit.findById(id,show);
      }
      this.drawer.open();
    }
  }

  closeEditSidenav() {
    if (this.drawer) {
      this.drawer.close();
    }
  }

}

export interface PeriodicElement {
  id: string;
  processName: string;
  key: string;
  createTime: string;
}
