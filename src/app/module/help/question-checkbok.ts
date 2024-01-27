import { QuestionBase } from './question-base';

export class CheckBoxQuestion extends QuestionBase<string> {
  override controlType = 'checkBox';
}


