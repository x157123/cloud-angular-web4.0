import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {GpuInfoEditComponent} from "./gpuInfoEdit.component";
import {GpuInfoViewComponent} from "./gpuInfoView.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gpuInfo',
  templateUrl: './gpuInfo.component.html',
  styleUrls: ['./gpuInfo.component.css'],
  standalone: false
})
export class GpuInfoComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['gpuInfo','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();
  isEditMode = true;

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appGpuInfoEdit', {static: false}) appGpuInfoEdit!: GpuInfoEditComponent;
  @ViewChild('appGpuInfoView', {static: false}) appGpuInfoView!: GpuInfoViewComponent;

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
    this.httpGlobalTool.post("/api/cloud-automation/gpuInfo/queryPage", param).subscribe({
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
      this.httpGlobalTool.post("/api/cloud-automation/gpuInfo/removeByIds",param).subscribe({
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
      this.appGpuInfoEdit.clearData()
      if(id != null && id>0){
        this.appGpuInfoEdit.findById(id);
      }
      this.drawer.open().catch((error) => {
        console.error('打开抽屉出错：', error);
      });
    }
  }

  openViewSidenav(id:number) {
    this.isEditMode = false;
    this.appGpuInfoView.clearData();
    if (this.drawer && id != null && id>0) {
      this.appGpuInfoView.findById(id);
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
  gpuInfo: string;
  version: string;
}
