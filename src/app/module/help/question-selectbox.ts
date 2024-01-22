import { QuestionBase } from './question-base';
import {TextBoxQuestion} from "./question-textbox";

export class SelectBoxQuestion extends QuestionBase<string> {
  override controlType = 'selectBox';
}


