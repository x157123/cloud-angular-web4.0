import { Component } from '@angular/core';
import {MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {Base} from "@component/dynamic-form/elements/base";

import {Observable, of} from "rxjs";
import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";
import {TextBox} from "@component/dynamic-form/elements/textbox";
import {TextareaBox} from "@component/dynamic-form/elements/textareabox";
import {RadioBox} from "@component/dynamic-form/elements/radiobox";
import {CheckBox} from "@component/dynamic-form/elements/checkbok";
import {SelectBox} from "@component/dynamic-form/elements/selectbox";
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
  ],
  templateUrl: './form-customization.component.html',
  styleUrl: './form-customization.component.css'
})
export class FormCustomizationComponent {

  formList$: Observable<Base<any>[]> | undefined;


  formList: Base<any> [] = [];


  drop($event: CdkDragDrop<Base<any>[], any>) {
    moveItemInArray(this.formList, $event.previousIndex, $event.currentIndex);
    this.setFormList();
  }

  setFormList(){
    this.formList$ = this.getData();
  }

  getData() {
    const questions: Base<string>[] = [

      TextBox.getInstance('name', '姓名', 1, true, '', 2, 20),

      TextBox.getInstance('phones', '电话号码', 2, true, 'phone', 0, 0),

      TextBox.getInstance('email', '电转邮箱', 6, true, 'email', 0, 0),

      TextareaBox.getInstance('bak', '备注', 7, true, 10, 300),

      RadioBox.getInstance('sex', '性别', 4, true, [
        {key: '男', value: '男'},
        {key: '女', value: '女'},
      ]),

      CheckBox.getInstance('love', '爱好', 4, true, [
        {key: '1', value: '游泳'},
        {key: '2', value: '跑步'},
        {key: '3', value: '购物'},
        {key: '4', value: '打游戏'},
      ]),

      SelectBox.getInstance('brave2', '民族', 4, true, [
        {key: '1', value: '汉'},
        {key: '2', value: '汉2'},
        {key: '3', value: '汉3'},
        {key: '4', value: '汉4'},
      ]),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
