import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {FlowableInitiateTaskComponent} from "./flowableInitiateTask.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDividerModule} from "@angular/material/divider";


@Component({
    selector: 'app-flowableInitiateTask-edit',
    templateUrl: './flowableInitiateTaskEdit.component.html',
    styleUrls: ['./flowableInitiateTaskEdit.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        MatDividerModule
    ]
})
export class FlowableInitiateTaskEditComponent implements AfterViewInit {


  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  processId: string = '';

  flowable: FlowableDict[] = [];


  constructor(private parent: FlowableInitiateTaskComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.getFlowable();
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  getFlowable(){
    this.httpGlobalTool.post("/api/flowable/getDeploymentList", null).subscribe({
      next: (res) => {
        this.flowable = res.data
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

  doSave(){
    this.showProgressBar();
    // let urlParam = new HttpParams();
    let urlParam = new URLSearchParams();
    urlParam.append('day',String(this.dataElement.day));
    urlParam.append('flowKey',this.dataElement.flowKey);
    urlParam.append('assignee',this.dataElement.assignee);
    urlParam.append('userId',this.dataElement.userId);


    this.httpGlobalTool.post("/api/flowable/startFlow", urlParam).subscribe({
      next: (res) => {
        this._alertService.success("保存成功")
        this.doSomething();
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete:()=>{
        this.hideProgressBar();
        this.clearData()
      }
    });
  }

  clearData(show?:boolean){
    if(show == null || !show){
      this.show = false;
    }else{
      this.show = true;
    }
    this.dataElement = {... this.defDataElement}
  }

  findById(id:string,show?:boolean) {
    if (show == null || !show) {
      this.show = false;
    } else {
      this.show = true;
    }
    if (id) {
      this.processId = id;
    }
    this.dataElement = {... this.defDataElement}
    this.hideProgressBar();
  }

  showProgressBar(){
    this.visibilityEditData = { 'visibility': 'visible'}
  }
  hideProgressBar(){
    this.visibilityEditData = { 'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    flowKey: '',
    day: 5,
    userId: 'user1',
    assignee: 'user2',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  flowKey: string;
  day: number;
  userId: string;
  assignee: string;
}


export interface FlowableDict {
  key: string;
  processName: string;
}
