import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id', 'siteName', 'loginBg', 'siteSubName'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}


  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  constructor(private httpGlobalTool: HttpGlobalTool) {
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
    this.httpGlobalTool.post("/api/site/queryPage", param).subscribe({
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

  openSidenav() {
    // 在视图初始化完成后访问 this.drawer
    if (this.drawer) {
      // 执行操作
      console.log('222222222222')
      this.drawer.open();
    } else {
      console.log('1111111333333333333333')
    }
  }

  closeSidenav() {
    // 在视图初始化完成后访问 this.drawer
    if (this.drawer) {
      // 执行操作
      console.log('222222222222')
      this.drawer.close();
    } else {
      console.log('1111111333333333333333')
    }
  }

}

export interface PeriodicElement {
  id: number;
  siteName: string;
  loginBg: string;
  siteSubName: string;
}
