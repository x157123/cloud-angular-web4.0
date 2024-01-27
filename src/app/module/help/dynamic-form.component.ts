import {Component, Input, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  ValidationErrors,
  Validators
} from '@angular/forms';

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

  constructor(private qcs: QuestionControlService) {
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

  add(){
    this.questions?.push(
      new TextBoxQuestion({
        key: 'phones',
        label: '电话号码s',
        validator: 'phone',
        required: true,
        order: 10,
      }),
    );
    this.form = this.qcs.toFormGroup(this.questions as QuestionBase<string>[]);
  }
}
