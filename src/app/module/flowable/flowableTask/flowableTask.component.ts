import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {FlowableTaskEditComponent} from "./flowableTaskEdit.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-flowableTask',
    templateUrl: './flowableTask.component.html',
    styleUrls: ['./flowableTask.component.css'],
    standalone: false
})
export class FlowableTaskComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  assignee: string = 'user2';
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','taskName','processName','startTime','processInstanceId','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appFlowableTaskEdit', {static: false}) appFlowableTaskEdit!: FlowableTaskEditComponent;

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
    param.set('assignee', String(this.assignee));
    this.showProgressBar()
    this.httpGlobalTool.post("/api/flowable/getTasks", param).subscribe({
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
      this.httpGlobalTool.post("/api/tests/flowableTask/removeByIds",param).subscribe({
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

  openHandleSidenav(id:string,show?:boolean) {
    if (this.drawer) {
      this.appFlowableTaskEdit.clearData()
      if(id != null){
        this.appFlowableTaskEdit.findById(id,this.assignee,show);
      }
      this.drawer.open().then(r => '');
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
