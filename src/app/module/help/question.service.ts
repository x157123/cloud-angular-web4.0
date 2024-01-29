import { Injectable } from '@angular/core';

import { SelectBoxQuestion } from './question-selectbox';
import { QuestionBase } from './question-base';
import { TextBoxQuestion } from './question-textbox';
import { of } from 'rxjs';
import {CheckBoxQuestion} from "./question-checkbok";
import {RadioBoxQuestion} from "./question-radiobox";
import {TextareaBoxQuestion} from "./question-textareabox";

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [


      TextBoxQuestion.getInstance('name','姓名',1,true,''),


      TextBoxQuestion.getInstance('phones','电话号码',2,true,'phone'),


      TextBoxQuestion.getInstance('email','电转邮箱',3,true,'email'),


      TextareaBoxQuestion.getInstance('bak','备注',5,true),

      new RadioBoxQuestion({
        key: 'sex',
        label: '性别',
        options: [
          { key: '男', value: '男' },
          { key: '女', value: '女' },
        ],
        order: 4,
      }),
      new CheckBoxQuestion({
        key: 'brave22',
        label: '爱好',
        options: [
          { key: '1', value: '游泳' },
          { key: '2', value: '跑步' },
          { key: '3', value: '购物' },
          { key: '4', value: '打游戏' },
        ],
        order: 6,
      }),
      new SelectBoxQuestion({
        key: 'brave2',
        label: '民族',
        options: [
          { key: '1', value: '汉' },
          { key: '2', value: '汉2' },
          { key: '3', value: '汉3' },
          { key: '4', value: '汉4' },
        ],
        order: 7,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}


