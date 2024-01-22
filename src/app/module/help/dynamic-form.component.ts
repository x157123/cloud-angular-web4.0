import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import {QuestionBase} from './question-base';
import {QuestionControlService} from './question-control.service';

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

    this.form.addControl('emailAddress', new FormControl('', [Validators.required, this.emailValidator]));
  }

  onSubmit() {
    if (this.form.valid) {
      this.payLoad = JSON.stringify(this.form.getRawValue());
      // @ts-ignore
      console.log(this.form.get('brave22').value)
    } else {
      this.payLoad = "数据错误";
    }
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value.includes('@')) {
      this.payLoad = "数据错误";
      return { emailAddress: { message: '请输入有效的电子邮件地址' } };
    }
    this.payLoad = "数据错误";
    return null;
  }
}
