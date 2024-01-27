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
      new TextBoxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1,
      }),

      new TextBoxQuestion({
        key: 'firstNames',
        label: 'First name',
        required: true,
        order: 2,
      }),

      new TextBoxQuestion({
        key: 'emailAddress',
        label: 'Email',
        validator: 'email',
        required: true,
        order: 3,
      }),

      new TextBoxQuestion({
        key: 'phone',
        label: '电话号码',
        validator: 'phone',
        required: true,
        order: 3,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}


