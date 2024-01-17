import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Dict, FlowableInitiateTaskComponent} from "./flowableInitiateTask.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@alert/alert.service";
import {HttpParams, HttpParamsOptions} from "@angular/common/http";



@Component({
  selector: 'app-flowableInitiateTask-edit',
  templateUrl: './flowableInitiateTaskEdit.component.html',
  styleUrls: ['./flowableInitiateTaskEdit.component.css'],
})
export class FlowableInitiateTaskEditComponent {


  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  processId: string = '';

  constructor(private parent: FlowableInitiateTaskComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,private cd: ChangeDetectorRef) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
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
    this.dataElement = this.defDataElement
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
    day: 0,
    userId: '',
    assignee: '',
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  flowKey: string;
  day: number;
  userId: string;
  assignee: string;
}

