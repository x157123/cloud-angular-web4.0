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
import {ErrorStateMatcher} from '@angular/material/core';

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

  matcher = new MyErrorStateMatcher();

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
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
