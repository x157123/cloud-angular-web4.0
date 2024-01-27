import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import {QuestionBase} from './question-base';

/**
 * 数据校验
 */
@Injectable()
export class QuestionControlService {


  toFormGroup(questions: QuestionBase<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      let validator = [];
      if (question.required) {
        validator.push(Validators.required);
      }
      if (question.validator === 'email') {
        validator.push(Validators.email);
      }
      if (question.validator === 'phone') {
        validator.push(this.phoneValidator);
      }

      //添加验证
      group[question.key] = validator.length > 0 ? new FormControl(question.value || '', validator)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const PHONE_NUMBER_REGEXP = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (!PHONE_NUMBER_REGEXP.test(control.value)) {
      return {phone: true, message: '请输入有效的电话号码'};
    }
    return null;
  }

}




