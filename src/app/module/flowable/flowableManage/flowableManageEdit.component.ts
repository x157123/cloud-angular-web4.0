import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Dict, FlowableManageComponent} from "./flowableManage.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";
import {FormControl, Validators} from "@angular/forms";



@Component({
    selector: 'app-flowableManage-edit',
    templateUrl: './flowableManageEdit.component.html',
    styleUrls: ['./flowableManageEdit.component.css'],
    standalone: false
})
export class FlowableManageEditComponent {


  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  selectFormControl = new FormControl('', Validators.required);

  showArr: boolean[] = [];

  constructor(private parent: FlowableManageComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,private cd: ChangeDetectorRef) {
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    let param = new URLSearchParams();
    param.set('bpmnXmlStr', this.defDataElement.bpmnXmlStr);
    this.httpGlobalTool.post("/api/flowable/createDeployment", param).subscribe({
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

  findById(id:Number,show?:boolean){
    if(show == null || !show){
      this.show = false;
    }else{
      this.show = true;
    }
    this.httpGlobalTool.get("/api/tests/flowableManage/findById?id="+id).subscribe({
      next: (res) => {
        this.dataElement = res.data
      },
      error: (e) => {
        this._alertService.error(e.error.error)
        this.hideProgressBar();
      },
      complete:()=>{
        this.hideProgressBar();
      }
    });
  }

  showProgressBar(){
    this.visibilityEditData = { 'visibility': 'visible'}
  }
  hideProgressBar(){
    this.visibilityEditData = { 'visibility': 'hidden'}
  }

  defDataElement: DataElement = {
    bpmnXmlStr: ''
  };

  dataElement: DataElement = JSON.parse(JSON.stringify(this.defDataElement));
}

export interface DataElement {

  id?: string;
  bpmnXmlStr: string;
}

