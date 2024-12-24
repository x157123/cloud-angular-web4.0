import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {Dict, IndexComponent} from "./index.component";
import {HttpGlobalTool} from "@http/HttpGlobalTool";
import {AlertService} from "@component/alert/alert.service";



@Component({
    selector: 'app-index-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    standalone: false
})
export class EditComponent {


  visibilityEditData = { 'visibility': 'hidden'}

  show: boolean = true;

  @ViewChild("sourceType")
  sourceType: Dict[] = [];



  constructor(private parent: IndexComponent,private httpGlobalTool: HttpGlobalTool,
              private _alertService: AlertService,private cd: ChangeDetectorRef) {
  }

  setSourceType(sourceType: Dict[]){
    this.sourceType = sourceType
    this.cd.detectChanges()
  }

  doSomething() {
    this.parent.closeEditSidenav();
    this.parent.queryData()
    this.dataElement = {... this.defDataElement}
  }

  doSave(){
    this.showProgressBar();
    this.httpGlobalTool.postBody("/api/cloud-sync/connectConfig/save", this.dataElement).subscribe({
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

  doTest(){
    this.showProgressBar();
    this.httpGlobalTool.postBody("/api/cloud-sync/connectConfig/test", this.dataElement).subscribe({
      next: (res) => {
        this._alertService.success("连接成功")
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
    this.httpGlobalTool.get("/api/cloud-sync/connectConfig/findById?id="+id).subscribe({
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

