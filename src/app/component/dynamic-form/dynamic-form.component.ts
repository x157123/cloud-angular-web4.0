import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup,} from '@angular/forms';

import {Base} from './elements/base';
import {ControlService} from './elements/control.service';
import {TextBox} from "./elements/textbox";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [ControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() formList: Base<string>[] | null = [];
  form!: FormGroup;
  payLoad = '';
  visibilityEditData: { [p: string]: any } | null | undefined;

  id = 1;

  constructor(private qcs: ControlService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
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
    let textBox = TextBox.getInstance('phones' + this.id, '电话号码' + this.id, 10, false, 'phone',0,0);
    this.formList?.push(textBox);
    this.qcs.addCustomValidator(this.form, textBox);
  }

  getValueLength(key: string): number {
    const control = this.form.get(key);
    return control?.value ? control.value.length : 0;
  }
}
