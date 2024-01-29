import {QuestionBase} from './question-base';

export class TextareaBoxQuestion extends QuestionBase<string> {

  private static instance: TextareaBoxQuestion | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean): TextareaBoxQuestion {
    TextareaBoxQuestion.instance = new TextareaBoxQuestion();
    TextareaBoxQuestion.instance.controlType = 'textareaBox'
    TextareaBoxQuestion.instance.key = key;
    TextareaBoxQuestion.instance.label = label;
    TextareaBoxQuestion.instance.required = required;
    TextareaBoxQuestion.instance.order = order;
    return TextareaBoxQuestion.instance;
  }
}


