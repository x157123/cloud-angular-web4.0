import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,} from '@angular/forms';

import {QuestionBase} from './question-base';
import {QuestionControlService} from './question-control.service';
import {TextBoxQuestion} from "./question-textbox";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  visibilityEditData: { [p: string]: any } | null | undefined;

  id = 1;

  constructor(private qcs: QuestionControlService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }

  onSubmit() {
    if (this.form.valid) {
      this.payLoad = JSON.stringify(this.form.getRawValue());
    } else {
      this.payLoad = "数据错误";
    }
  }

  add() {
    this.id +=1;
    let textBox = TextBoxQuestion.getInstance('phones' + this.id, '电话号码' + this.id, 10, false, 'phone');
    this.questions?.push(textBox);
    this.qcs.addCustomValidator(this.form, textBox);
  }
}
