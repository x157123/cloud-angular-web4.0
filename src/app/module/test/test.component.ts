import {Component, ViewChild} from '@angular/core';
import {DynamicFormComponent} from "@component/dynamic-form/dynamic-form.component";
import {Observable, of} from "rxjs";
import {Base} from "@component/dynamic-form/elements/base";
import {AsyncPipe} from "@angular/common";
import {TextBox} from "@component/dynamic-form/elements/textbox";
import {TextareaBox} from "@component/dynamic-form/elements/textareabox";
import {RadioBox} from "@component/dynamic-form/elements/radiobox";
import {CheckBox} from "@component/dynamic-form/elements/checkbok";
import {SelectBox} from "@component/dynamic-form/elements/selectbox";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    DynamicFormComponent,
    AsyncPipe
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {


  @ViewChild(DynamicFormComponent) dynamicFormComponent!: DynamicFormComponent;


  formList$: Observable<Base<any>[]>;

  constructor() {
    const questions: Base<string>[] = [

      TextBox.getInstance('name', '姓名', 1, true, false, '', 2, 20, '', ''),


      TextBox.getInstance('phones', '电话号码', 2, true, false, 'phone', 0, 0, '', ''),


      TextBox.getInstance('email', '电转邮箱', 6, true, false, 'email', 0, 0, '', ''),


      TextareaBox.getInstance('bak', '备注', 7, true, true, 10, 300, '', ''),

      RadioBox.getInstance('sex', '性别', 4, true, false, [
        {key: '男', value: '男'},
        {key: '女', value: '女'},
      ], '', ''),

      CheckBox.getInstance('love', '爱好', 4, true, false, [
        {key: '1', value: '游泳'},
        {key: '2', value: '跑步'},
        {key: '3', value: '购物'},
        {key: '4', value: '打游戏'},
      ], '', ''),

      SelectBox.getInstance('brave2', '民族', 4, true, false, [
        {key: '1', value: '汉'},
        {key: '2', value: '汉2'},
        {key: '3', value: '汉3'},
        {key: '4', value: '汉4'},
      ], '', ''),
    ];

    this.formList$ = of(questions.sort((a, b) => a.order - b.order));

  }


  handleButtonClick(message: string): void {
    console.log('receivedMessage:', message);
  }

  callChildMethod(): void {
    if (this.dynamicFormComponent) {
      this.dynamicFormComponent.onSubmit();
    }
  }
}
