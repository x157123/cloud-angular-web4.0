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
      let validator = this.getValidator(question);
      //添加验证
      group[question.key] = validator.length > 0 ? new FormControl(question.value || '', validator)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  private getValidator(question: QuestionBase<string>) {
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
    return validator;
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const PHONE_NUMBER_REGEXP = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
    if (!PHONE_NUMBER_REGEXP.test(control.value)) {
      return {phone: true, message: '请输入有效的电话号码'};
    }
    return null;
  }


  addCustomValidator(form: FormGroup, question: QuestionBase<string>) {
    // 添加自定义校验器
    let validator = this.getValidator(question);
    console.log('1111111111111111', validator)
    form.addControl(question.value || '', validator.length > 0 ? new FormControl(question.value || '', validator)
      : new FormControl(question.value || ''));
    console.log('2222222222222222222', form)
    // 更新校验状态
    form.updateValueAndValidity();
    console.log('3333333333333333333')
  }

  removeCustomValidator(form: FormGroup, question: QuestionBase<string>) {
    // 移除自定义校验器
    const control = form.get(question.key);
    if (control != null) {
      control.clearValidators();
      control.updateValueAndValidity(); // 更新校验状态
    }
  }
}




