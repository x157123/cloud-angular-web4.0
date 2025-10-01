import {Component, ViewChild} from '@angular/core';
import {DeployComponent, SyncConfig} from "./deploy.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnComponent} from "./column/column.component";
import {TableComponent} from "./table/table.component";
import {MatStepper, MatStepperModule} from "@angular/material/stepper";
import {CommonModule} from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';


@Component({
    selector: 'app-deploy-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: { showError: true },
        },
    ],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatDividerModule,
        MatProgressBarModule,
        MatTabsModule,
        MatIconModule,
        ColumnComponent,
        TableComponent
    ]
})
export class EditComponent {


  @ViewChild("appEditTable", {static: false}) appEditTable!: MatTabGroup;
  @ViewChild("appColumn", {static: false}) appColumn!: ColumnComponent;
  @ViewChild("appSyncTable", {static: false}) appSyncTable!: TableComponent;
  @ViewChild('stepper', {static: false}) stepper!: MatStepper;

  syncConfig : SyncConfig = {
    name: '',
    readConnectType: 1,
    readConnectId: 0,
    readConnectName: '',
    writeConnectType: 2,
    writeConnectId: 0,
    writeConnectName: '',
    version: 1,
    state: 0,
    offSet: '',
    tableConfig: []
  }

  sourceType: Dict[] = [
    {value: '1', viewValue: 'mysql'},
    {value: '2', viewValue: 'oracle'},
    {value: '4', viewValue: 'postgresql'},
  ]

  readDb: DataBase[] = []

  writeDb: DataBase[] = []

  constructor(private parent: DeployComponent, private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService, private _formBuilder: FormBuilder) {
  }

  readList(ob: number,type:number) {
    let param = new URLSearchParams();
    param.set('type', String(ob));
    this.httpGlobalTool.post("/api/cloud-sync/connectConfig/findByList",param).subscribe({
      next: (res) => {
        if(type == 1){
          this.readDb = res.data
        }else{
          this.writeDb = res.data
        }
      },
      error: (e) => {
        this._alertService.error(e.error.error)
      },
      complete: () => {
      }
    });
  }

  /**
   * 重置表单
   */
  reset() {
    this.syncConfig = {
      name: '',
      readConnectType: 1,
      readConnectId: 0,
      readConnectName: '',
      writeConnectType: 2,
      writeConnectId: 0,
      writeConnectName: '',
      version: 1,
      state: 0,
      offSet: '',
      tableConfig: []
    }
    this.readDb = []
    this.writeDb = []
    this.appSyncTable.reset()
    this.appColumn.reset()
    this.stepper.selectedIndex = 0
    this.exitAddTable()
  }

  /**
   * 打开新增同步表页面
   */
  showAddSync() {
    const tabGroup = this.appEditTable;
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    this.appColumn.reset()
    tabGroup.selectedIndex = 1;
  }

  showEditSync(tableConfig: TableConfig){
    const tabGroup = this.appEditTable;
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    this.appColumn.setData(tableConfig);
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
        this.reset()
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
        console.log(this.syncConfig)
        this.readList(this.syncConfig.readConnectType,1)
        this.readList(this.syncConfig.writeConnectType,2)
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


  showProgressBar() {
    this.visibilityEditData = {'visibility': 'visible'}
  }

  hideProgressBar() {
    this.visibilityEditData = {'visibility': 'hidden'}
  }
}

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
  key: number,
  defaultValue: string,
  convertFun: string,
}

export interface Dict {
  value: string;
  viewValue: string;
}

export interface DataBase {
  id: number;
  remark: string;
}
