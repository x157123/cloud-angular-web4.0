import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import {Base} from './base';
import {TextBox} from "@component/dynamic-form/elements/textbox";
import {TextareaBox} from "@component/dynamic-form/elements/textareabox";
import {RadioBox} from "@component/dynamic-form/elements/radiobox";
import {CheckBox} from "@component/dynamic-form/elements/checkbok";
import {SelectBox} from "@component/dynamic-form/elements/selectbox";

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
    if (question.controlType === 'numberBox') {
      if (question.minLength > 0) {
        validator.push(Validators.min(question.minLength));
      }
      if (question.maxLength > 0) {
        validator.push(Validators.max(question.maxLength));
      }
    } else {
      if (question.minLength > 0) {
        validator.push(Validators.minLength(question.minLength));
      }
      if (question.maxLength > 0) {
        validator.push(Validators.maxLength(question.maxLength));
      }
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
      control.updateValueAndValidity();
    }
  }


  json2list(jsonList: string) {
    let list = JSON.parse(jsonList);
    const tmp: Base<string>[] = [];
    for (let i = 0; i < list.length; i++) {
      let question = list[i];
      question.key
      if (question.controlType === 'textBox') {
        tmp.push(TextBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.validator, question.minLength, question.maxLength, question.associationKey, question.associationValue));
      } else if (question.controlType === 'numberBox') {
        tmp.push(TextBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.validator, question.minLength, question.maxLength, question.associationKey, question.associationValue));
      } else if (question.controlType === 'textareaBox') {
        tmp.push(TextareaBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.minLength, question.maxLength, question.associationKey, question.associationValue));
      } else if (question.controlType === 'radioBox') {
        tmp.push(RadioBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.options, question.associationKey, question.associationValue));
      } else if (question.controlType === 'checkBox') {
        tmp.push(CheckBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.options, question.associationKey, question.associationValue));
      } else if (question.controlType === 'selectBox') {
        tmp.push(SelectBox.getInstance(question.key, question.label, question.order, question.required, question.phonetics, question.options, question.associationKey, question.associationValue));
      }
    }
    return tmp;
  }
}




