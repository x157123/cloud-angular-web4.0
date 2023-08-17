import {Component, ViewChild} from '@angular/core';
import {DeployComponent, SyncConfig} from "./deploy.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@alert/alert.service";
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import {MatTabGroup} from "@angular/material/tabs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnComponent} from "./column/column.component";
import {TableComponent} from "./table/table.component";


export interface TableConfig {
  name: string,
  type: number,
  readTable: string,
  writeTable: string,
  columns: ColumnConfig[];
}

export interface ColumnConfig{
  readColumn: string,
  writeColumn: string,
  key: boolean,
}


@Component({
  selector: 'app-deploy-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class EditComponent {


  @ViewChild("appEditTable", {static: false}) appEditTable!: MatTabGroup;
  @ViewChild("appColumn", {static: false}) appColumn!: ColumnComponent;
  @ViewChild("appSyncTable", {static: false}) appSyncTable!: TableComponent;

  syncConfig : SyncConfig = {
    name: '',
    readConnectId: 0,
    writeConnectId: 0,
    version: 1,
    state: 0,
    offSet: '',
    tableConfig: []
  }

  constructor(private parent: DeployComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService, private _formBuilder: FormBuilder) {
  }


  /**
   * 打开新增同步表页面
   */
  showAddSync() {
    const tabGroup = this.appEditTable;
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    tabGroup.selectedIndex = 1;
  }

  /**
   * 添加新增同步表配置
   */
  addTable() {
    let columnJoin: TableConfig = this.appColumn.getData();
    this.appSyncTable.add(columnJoin);
    this.exitAddTable();
  }

  /**
   * 取消同步表页面
   */
  exitAddTable() {
    this.appColumn.reset()
    const tabGroup = this.appEditTable;
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    tabGroup.selectedIndex = 0;
  }

  /**
   * 加载数据库配
   */
  initDataBase(){
    this.appColumn.getTableData(this.syncConfig.readConnectId,this.syncConfig.writeConnectId);
  }

  /**
   * 保存
   */
  doSave() {
    this.showProgressBar();
    this.syncConfig.tableConfig = this.appSyncTable.getData();
    this.httpGlobalTool.postBody("/api/cloud-sync/serve/save", this.syncConfig).subscribe({
      next: (res) => {
        this._alertService.success("保存成功")
        this.doSomething();
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete: () => {
        this.hideProgressBar();
        this.clearData()
      }
    });
  }

  /**
   * 获取数据
   * @param id
   */
  findById(id: Number, show?: boolean) {
    if (show == null || !show) {
      this.show = false;
    } else {
      this.show = true;
    }
    this.httpGlobalTool.get("/api/cloud-sync/serve/findServeParamById?id=" + id).subscribe({
      next: (res) => {
        this.syncConfig = res.data
        this.appSyncTable.setData(res.data.tableConfig)
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete: () => {
        this.hideProgressBar();
      }
    });
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {...this.defDataElement}
  }



  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  visibilityEditData = {'visibility': 'hidden'}

  show: boolean = true;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  toggleEditMode(index: number) {
    console.log(index)
    // this.doneShow[index] = true;
  }



  clearData(show?: boolean) {
    if (show == null || !show) {
      this.show = false;
    } else {
      this.show = true;
    }
    this.dataElement = this.defDataElement
  }

  showProgressBar() {
    this.visibilityEditData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityEditData = {'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    type: '',
    hostname: '',
    port: '',
    databaseName: '',
    user: '',
    password: '',
    tablePrefix: '',
    remark: '',
    version: ''
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));

}

export interface DataElement {
  id?: number;
  type: string;
  hostname: string;
  port: string;
  databaseName: string;
  user: string;
  password: string;
  tablePrefix: string;
  remark: string;
  version: string;
}

