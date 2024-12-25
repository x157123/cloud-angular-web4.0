import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {PageEvent} from "@angular/material/paginator";
import {MatDrawer} from "@angular/material/sidenav";
import {AccountInfoEditComponent} from "./accountInfoEdit.component";
import {AlertService} from "@component/alert/alert.service";


export interface Dict {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-accountInfo',
  templateUrl: './accountInfo.component.html',
  styleUrls: ['./accountInfo.component.css'],
  standalone: false
})
export class AccountInfoComponent implements AfterViewInit {

  pageEvent: PageEvent = new PageEvent();
  dataLength: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  displayedColumns: string[] = ['id','username','account','password','key','region','accountType','isActive','remarks','email','createTime','updateTime','operate'];
  dataSource = new MatTableDataSource<PeriodicElement>();

  visibilityListData = {'visibility': 'hidden'}

  @ViewChild('drawer', {static: false}) drawer!: MatDrawer;

  @ViewChild('appAccountInfoEdit', {static: false}) appAccountInfoEdit!: AccountInfoEditComponent;

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
    this.httpGlobalTool.post("/api/cloud-automation/accountInfo/queryPage", param).subscribe({
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
      this.httpGlobalTool.post("/api/cloud-automation/accountInfo/removeByIds",param).subscribe({
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
      this.appAccountInfoEdit.clearData()
      if(id != null && id>0){
        this.appAccountInfoEdit.findById(id,show);
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
  username: string;
  account: string;
  password: string;
  key: string;
  region: string;
  accountType: string;
  isActive: string;
  remarks: string;
  email: string;
}