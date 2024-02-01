import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {FlowableTaskComponent} from "./flowableTask.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";



@Component({
  selector: 'app-flowableTask-edit',
  templateUrl: './flowableTaskEdit.component.html',
  styleUrls: ['./flowableTaskEdit.component.css'],
})
export class FlowableTaskEditComponent {


  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  sourceType: Dict[] = [
    {value: '通过', viewValue: '通过'},
    {value: '驳回', viewValue: '驳回'},
  ]

  constructor(private parent: FlowableTaskComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,private cd: ChangeDetectorRef) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    let urlParam = new URLSearchParams();
    urlParam.append('outcome',this.defDataElement.outcome);
    urlParam.append('taskId',this.defDataElement.taskId);
    urlParam.append('assignee',this.defDataElement.assignee);
    this.httpGlobalTool.post("/api/flowable/complete", urlParam).subscribe({
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

  findById(id:string,assignee:string,show?:boolean){
    this.dataElement.taskId = id;
    this.dataElement.assignee = assignee;
    this.hideProgressBar();
  }

  showProgressBar(){
    this.visibilityEditData = { 'visibility': 'visible'}
  }
  hideProgressBar(){
    this.visibilityEditData = { 'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    taskId: '',
    outcome: '',
    assignee: ''
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {
  taskId: string;
  outcome: string;
  assignee: string;
}
export interface Dict {
  value: string;
  viewValue: string;
}
