import { Injectable } from '@angular/core';

import { SelectBoxQuestion } from './question-selectbox';
import { QuestionBase } from './question-base';
import { TextBoxQuestion } from './question-textbox';
import { of } from 'rxjs';
import {CheckBoxQuestion} from "./question-checkbok";
import {RadioBoxQuestion} from "./question-radiobox";

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new RadioBoxQuestion({
        key: 'brave12',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 3,
      }),
      new CheckBoxQuestion({
        key: 'brave22',
        label: 'Bravery Rating',
        options: [
          { key: '1', value: 'Solid' },
          { key: '2', value: 'Great' },
          { key: '3', value: 'Good' },
          { key: '4', value: 'Unproven' },
        ],
        order: 9,
      }),
      new SelectBoxQuestion({
        key: 'brave2',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' },
        ],
        order: 5,
      }),

      TextBoxQuestion.getInstance('name','姓名',1,true,''),


      TextBoxQuestion.getInstance('phones','电话号码',2,true,'phone'),


      TextBoxQuestion.getInstance('email','电转邮箱',3,true,'email'),


    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}


