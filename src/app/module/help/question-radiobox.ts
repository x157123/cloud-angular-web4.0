import { QuestionBase } from './question-base';

export class RadioBoxQuestion extends QuestionBase<string> {

  private static instance: RadioBoxQuestion;
  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): RadioBoxQuestion {
    RadioBoxQuestion.instance = new RadioBoxQuestion();
    RadioBoxQuestion.instance.controlType = 'radioBox'
    RadioBoxQuestion.instance.key = key;
    RadioBoxQuestion.instance.label = label;
    RadioBoxQuestion.instance.required = required;
    RadioBoxQuestion.instance.order = order;
    RadioBoxQuestion.instance.options = options;
    return RadioBoxQuestion.instance;
  }
}


