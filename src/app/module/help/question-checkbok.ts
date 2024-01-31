import { QuestionBase } from './question-base';

export class CheckBoxQuestion extends QuestionBase<string> {
  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): CheckBoxQuestion {
    CheckBoxQuestion.instance = new CheckBoxQuestion();
    CheckBoxQuestion.instance.controlType = 'checkBox'
    CheckBoxQuestion.instance.key = key;
    CheckBoxQuestion.instance.label = label;
    CheckBoxQuestion.instance.required = required;
    CheckBoxQuestion.instance.order = order;
    CheckBoxQuestion.instance.options = options;
    return CheckBoxQuestion.instance;
  }
}


