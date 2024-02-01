import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {FlowableInitiateTaskEditComponent} from "./flowableInitiateTaskEdit.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-flowableInitiateTask',
  templateUrl: './flowableInitiateTask.component.html',
  styleUrls: ['./flowableInitiateTask.component.css'],
})
export class FlowableInitiateTaskComponent implements AfterViewInit {

  user: string = 'user1';
  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','taskName','processName','status','startTime','processInstanceId','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appFlowableInitiateTaskEdit', {static: false}) appFlowableInitiateTaskEdit!: FlowableInitiateTaskEditComponent;

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
    param.set('userId',this.user);
    this.showProgressBar()
    this.httpGlobalTool.post("/api/flowable/getUserStartFlow", param).subscribe({
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

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.queryData();
  }

  openEditSidenav(id?:string,show?:boolean) {
    if (this.drawer) {
      this.appFlowableInitiateTaskEdit.clearData()
      if(id != null){
        this.appFlowableInitiateTaskEdit.findById(id,show);
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
  taskName: string;
  processName: string;
  status: string;
  startTime: string;
  processInstanceId: string;
}
