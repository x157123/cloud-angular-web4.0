import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import {Base} from './base';

/**
 * 表单控制器
 */
@Injectable()
export class ControlService {


  toFormGroup(questions: Base<string>[]) {
    const group: any = {};

    questions.forEach(question => {
      let validator = this.getValidator(question);
      //添加验证
      group[question.key] = validator.length > 0 ? new FormControl(question.value || '', validator)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  private getValidator(question: Base<string>) {
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
    if (question.minLength > 0) {
      validator.push(Validators.minLength(question.minLength));
    }
    if (question.maxLength > 0) {
      validator.push(Validators.maxLength(question.maxLength));
    }
    return validator;
  }

  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value !== '') {
      const PHONE_NUMBER_REGEXP = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))\d{8}$/
      if (!PHONE_NUMBER_REGEXP.test(control.value)) {
        return {phone: true, message: '请输入有效的电话号码'};
      }
    }
    return null;
  }


  addCustomValidator(form: FormGroup, question: Base<string>) {
    // 添加自定义校验器
    let validator = this.getValidator(question);
    form.addControl(question.key, new FormControl('', validator))
  }

  removeCustomValidator(form: FormGroup, question: Base<string>) {
    // 移除自定义校验器
    const control = form.get(question.key);
    if (control != null) {
      control.clearValidators();
      control.updateValueAndValidity(); // 更新校验状态
    }
  }
}




