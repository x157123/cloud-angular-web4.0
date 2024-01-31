import { QuestionBase } from './question-base';
import {TextBoxQuestion} from "./question-textbox";

export class SelectBoxQuestion extends QuestionBase<string> {

  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): SelectBoxQuestion {
    SelectBoxQuestion.instance = new SelectBoxQuestion();
    SelectBoxQuestion.instance.controlType = 'selectBox'
    SelectBoxQuestion.instance.key = key;
    SelectBoxQuestion.instance.label = label;
    SelectBoxQuestion.instance.required = required;
    SelectBoxQuestion.instance.order = order;
    SelectBoxQuestion.instance.options = options;
    return SelectBoxQuestion.instance;
  }
}


