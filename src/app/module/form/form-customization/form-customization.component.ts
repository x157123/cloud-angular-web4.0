import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild} from '@angular/core';
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Base} from "@component/dynamic-form/elements/base";

import {Observable, of} from "rxjs";
import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCardActions} from "@angular/material/card";
import {ControlService} from "@component/dynamic-form/elements/control.service";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
@Component({
  selector: 'app-form-customization',
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    CdkDropList,
    CdkDrag,
    MatInput,
    ReactiveFormsModule,
    AsyncPipe,
    DynamicFormComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatButton,
    MatCardActions,
    MatIcon,
  ],
  providers: [ControlService],
  templateUrl: './form-customization.component.html',
  styleUrl: './form-customization.component.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FormCustomizationComponent{

  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;

  formList$: Observable<Base<any>[]> | undefined;

  jsonData$: string = "{\"name\":\"123\",\"phones\":\"15222223332\",\"email\":\"123@12\",\"bak\":\"12333333333333332\",\"sex\":\"女\",\"love\":[\"1\",\"2\"],\"brave2\":\"2\"}";

  formList: Base<any> [] = [];

  panelOpenState: boolean = false;

  drop($event: CdkDragDrop<Base<any>[], any>) {
    moveItemInArray(this.formList, $event.previousIndex, $event.currentIndex);
    this.setFormList();
  }

  constructor(private qcs: ControlService) {
    this.formList = this.getData();
    this.setFormList()
  }

  setFormList(){
    for (let i = 0; i < this.formList.length; i++) {
      this.formList[i].order = i;
    }
    this.formList$ = of(this.formList.sort((a, b) => a.order - b.order));
    if (this.dynamicFormComponent) {
      this.dynamicFormComponent.refreshForm();
    }
  }

  onSubmit(){
    if (this.dynamicFormComponent) {
      console.log('666666666666666666');
      this.dynamicFormComponent.onSubmit();
    }
  }

  addForm(index : number) {
    console.log('555555555555555555');
    if (this.dynamicFormComponent) {
      this.dynamicFormComponent.add(index);
    }
  }
  delForm(index : number){
    console.log('333333333333333333', index);
    this.dynamicFormComponent.delForm(index);
  }

  refreshForm(){
    console.log('444444444444444444444444444');
    if (this.dynamicFormComponent) {
      this.dynamicFormComponent.refreshForm();
    }
  }

  saveForm(){
    if (this.dynamicFormComponent) {
      console.log(JSON.stringify(this.formList));
    }
  }

  handleButtonClick(message: string): void {
    console.log('receivedMessage2:', message);
  }

  getData() {

    let jsonList = "[{\"key\":\"name\",\"label\":\"姓名\",\"required\":true,\"order\":0,\"controlType\":\"textBox\",\"type\":\"\",\"minLength\":2,\"maxLength\":20,\"validator\":\"\",\"phonetics\":false,\"options\":[]},{\"key\":\"phones\",\"label\":\"电话号码\",\"required\":true,\"order\":1,\"controlType\":\"textBox\",\"type\":\"\",\"minLength\":0,\"maxLength\":0,\"validator\":\"phone\",\"phonetics\":false,\"options\":[]},{\"key\":\"email\",\"label\":\"电转邮箱\",\"required\":true,\"order\":2,\"controlType\":\"textBox\",\"type\":\"\",\"minLength\":0,\"maxLength\":0,\"validator\":\"email\",\"phonetics\":false,\"options\":[]},{\"key\":\"bak\",\"label\":\"备注\",\"required\":true,\"order\":3,\"controlType\":\"textareaBox\",\"type\":\"\",\"minLength\":10,\"maxLength\":300,\"validator\":\"\",\"phonetics\":true,\"options\":[]},{\"key\":\"sex\",\"label\":\"性别\",\"required\":true,\"order\":4,\"controlType\":\"radioBox\",\"type\":\"\",\"minLength\":0,\"maxLength\":5000,\"validator\":\"\",\"phonetics\":false,\"options\":[{\"key\":\"男\",\"value\":\"男\"},{\"key\":\"女\",\"value\":\"女\"}]},{\"key\":\"love\",\"label\":\"爱好\",\"required\":true,\"order\":5,\"controlType\":\"checkBox\",\"type\":\"\",\"minLength\":0,\"maxLength\":5000,\"validator\":\"\",\"phonetics\":false,\"options\":[{\"key\":\"1\",\"value\":\"游泳\"},{\"key\":\"2\",\"value\":\"跑步\"},{\"key\":\"3\",\"value\":\"购物\"},{\"key\":\"4\",\"value\":\"打游戏\"}]},{\"key\":\"brave2\",\"label\":\"民族\",\"required\":true,\"order\":6,\"controlType\":\"selectBox\",\"type\":\"\",\"minLength\":0,\"maxLength\":5000,\"validator\":\"\",\"phonetics\":false,\"options\":[{\"key\":\"1\",\"value\":\"汉\"},{\"key\":\"2\",\"value\":\"汉2\"},{\"key\":\"3\",\"value\":\"汉3\"},{\"key\":\"4\",\"value\":\"汉4\"}]}]";

    const questions: Base<string>[] = this.qcs.json2list(jsonList);

    console.log('xxxxxxxxx1111111111', questions);

    return questions;
  }

  // 删除选项
  removeOption(i:number, k: number) {
    console.log('111111111111', k);
    this.formList[i].options.splice(k, 1);
  }

  addOption(i: number, k: number) {
    //在当前选项后面添加一个新选项
    console.log('222222222222', k);
    this.formList[i].options.splice(k + 1, 0, {key: '选项key', value: '选项value'});
  }

  //更改类型
  onSelectionChange(i:number) {
    console.log(this.formList[i].controlType);
    if(this.formList[i].options.length === 0 && (this.formList[i].controlType === 'selectBox' || this.formList[i].controlType === 'radioBox' || this.formList[i].controlType === 'checkBox')){
      this.formList[i].options = [{key: '选项key', value: '选项value'}];
    }
    if(this.formList[i].controlType === 'numberBox'){
      this.formList[i].type = 'number';
    } else {
      this.formList[i].type = '';
    }
  }
  onSelectionAssociationKey(i:number){

  }

  onSelectionAssociationValue(i:number) {

  }
}
