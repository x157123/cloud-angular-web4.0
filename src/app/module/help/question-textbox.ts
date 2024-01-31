import {QuestionBase} from './question-base';

export class TextBoxQuestion extends QuestionBase<string> {

  private static instance: TextBoxQuestion | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean, validator: string, minLength: number, maxLength: number): TextBoxQuestion {
    TextBoxQuestion.instance = new TextBoxQuestion();
    TextBoxQuestion.instance.controlType = 'textBox'
    TextBoxQuestion.instance.key = key;
    TextBoxQuestion.instance.label = label;
    TextBoxQuestion.instance.validator = validator;
    TextBoxQuestion.instance.required = required;
    TextBoxQuestion.instance.minLength = minLength;
    TextBoxQuestion.instance.maxLength = maxLength;
    TextBoxQuestion.instance.order = order;
    return TextBoxQuestion.instance;
  }
}


