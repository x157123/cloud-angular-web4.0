import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatDrawer} from "@angular/material/sidenav";
import {EditComponent, TableConfig} from "./edit.component";
import {AlertService} from "@alert/alert.service";
import {HttpGlobalTool} from "@http/HttpGlobalTool";

@Component({
  selector: 'app-deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['name', 'readConnectId', 'writeConnectId', 'state', 'offSet'];
  dataSource = new MatTableDataSource<SyncConfig>();

  visibilityListData = {'visibility': 'hidden'}


  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appDeployEdit', {static: false}) appDeployEdit!: EditComponent;

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
    this.httpGlobalTool.post("/api/cloud-sync/serve/queryPage", param).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource<SyncConfig>(res.data.records)
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
      this.httpGlobalTool.post("/api/cloud-sync/serve/removeByIds",param).subscribe({
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
      this.appDeployEdit.clearData()
      if(id != null && id>0){
        this.appDeployEdit.findById(id,show);
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

export interface SyncConfig {
  id: number;
  name: string;
  readConnectId: number;
  writeConnectId: number;
  version: number;
  state: number;
  offSet: string;
  tableConfig?: TableConfig[];
}
