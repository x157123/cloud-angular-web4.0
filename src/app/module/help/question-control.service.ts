import { Injectable } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

import { QuestionBase } from './question-base';

/**
 * 数据校验
 */
@Injectable()
export class QuestionControlService {


  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      let validator = [];
      if(question.required){
        validator.push(Validators.required);
      }
      if(question.validator === 'email'){
        validator.push(Validators.email);
      }
      //添加验证
      group[question.key] = validator.length>0 ? new FormControl(question.value || '', validator)
                                              : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }


  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value.includes('@')) {
      return { emailError : { message: '请输入有效的电子邮件地址' } };
    }
    return null;
  }
}




