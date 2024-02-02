import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatFormField, MatInput} from "@angular/material/input";
import {AsyncPipe, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Base} from "@component/dynamic-form/elements/base";

import {Observable, of} from "rxjs";
import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";
import {TextBox} from "@component/dynamic-form/elements/textbox";
import {TextareaBox} from "@component/dynamic-form/elements/textareabox";
import {RadioBox} from "@component/dynamic-form/elements/radiobox";
import {CheckBox} from "@component/dynamic-form/elements/checkbok";
import {SelectBox} from "@component/dynamic-form/elements/selectbox";
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
@Component({
  selector: 'app-form-customization',
  standalone: true,
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    CdkDropList,
    CdkDrag,
    MatInput,
    NgForOf,
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
  ],
  templateUrl: './form-customization.component.html',
  styleUrl: './form-customization.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FormCustomizationComponent {

  formList$: Observable<Base<any>[]> | undefined;


  formList: Base<any> [] = [];

  panelOpenState: boolean = false;

  compareWith(a: any, b: any) {
    return a === b || (a === 'true' && b === true) || (a === 'false' && b === false);
  }

  drop($event: CdkDragDrop<Base<any>[], any>) {
    moveItemInArray(this.formList, $event.previousIndex, $event.currentIndex);
    this.setFormList();
  }

  constructor() {
    this.formList = this.getData();
    this.setFormList()
  }

  setFormList(){
    for (let i = 0; i < this.formList.length; i++) {
      this.formList[i].order = i;
    }
    this.formList$ = of(this.formList.sort((a, b) => a.order - b.order));
  }

  getData() {
    const questions: Base<string>[] = [

      TextBox.getInstance('name', '姓名', 1, true,false, '', 2, 20),

      TextBox.getInstance('phones', '电话号码', 2, true, false,'phone', 0, 0),

      TextBox.getInstance('email', '电转邮箱', 6, true, false,'email', 0, 0),

      TextareaBox.getInstance('bak', '备注', 7, true, true,10, 300),

      RadioBox.getInstance('sex', '性别', 4, true, false,[
        {key: '男', value: '男'},
        {key: '女', value: '女'},
      ]),

      CheckBox.getInstance('love', '爱好', 4, true,false, [
        {key: '1', value: '游泳'},
        {key: '2', value: '跑步'},
        {key: '3', value: '购物'},
        {key: '4', value: '打游戏'},
      ]),

      SelectBox.getInstance('brave2', '民族', 4, true, false,[
        {key: '1', value: '汉'},
        {key: '2', value: '汉2'},
        {key: '3', value: '汉3'},
        {key: '4', value: '汉4'},
      ]),

    ];
    return questions;
  }
}
