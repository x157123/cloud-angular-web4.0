import {Injectable} from '@angular/core';

import {SelectBoxQuestion} from './question-selectbox';
import {QuestionBase} from './question-base';
import {TextBoxQuestion} from './question-textbox';
import {of} from 'rxjs';
import {CheckBoxQuestion} from "./question-checkbok";
import {RadioBoxQuestion} from "./question-radiobox";
import {TextareaBoxQuestion} from "./question-textareabox";

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [


      TextBoxQuestion.getInstance('name', '姓名', 1, true, '', 2, 20),


      TextBoxQuestion.getInstance('phones', '电话号码', 2, true, 'phone', 0, 0),


      TextBoxQuestion.getInstance('email', '电转邮箱', 6, true, 'email', 0, 0),


      TextareaBoxQuestion.getInstance('bak', '备注', 7, true, 10, 300),

      RadioBoxQuestion.getInstance('sex', '性别', 4, true, [
        {key: '男', value: '男'},
        {key: '女', value: '女'},
      ]),

      CheckBoxQuestion.getInstance('love', '爱好', 4, true, [
        {key: '1', value: '游泳'},
        {key: '2', value: '跑步'},
        {key: '3', value: '购物'},
        {key: '4', value: '打游戏'},
      ]),

      SelectBoxQuestion.getInstance('brave2', '民族', 4, true, [
        {key: '1', value: '汉'},
        {key: '2', value: '汉2'},
        {key: '3', value: '汉3'},
        {key: '4', value: '汉4'},
      ]),

    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}


