import {Injectable} from '@angular/core';

import {SelectBox} from '@component/dynamic-form/elements/selectbox';
import {Base} from '@component/dynamic-form/elements/base';
import {TextBox} from '@component/dynamic-form/elements/textbox';
import {of} from 'rxjs';
import {CheckBox} from "@component/dynamic-form/elements/checkbok";
import {RadioBox} from "@component/dynamic-form/elements/radiobox";
import {TextareaBox} from "@component/dynamic-form/elements/textareabox";

@Injectable()
export class DataService {
  // TODO: get from a remote source of question metadata
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


