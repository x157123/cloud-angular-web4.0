import {Component, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent, MatPaginatorModule} from "@angular/material/paginator";
import {MatDrawer, MatSidenavModule} from "@angular/material/sidenav";
import {FlowableTaskEditComponent} from "./flowableTaskEdit.component";
import {AlertService} from "@component/alert/alert.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-flowableTask',
    templateUrl: './flowableTask.component.html',
    styleUrls: ['./flowableTask.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatProgressBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        FlowableTaskEditComponent
    ]
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
