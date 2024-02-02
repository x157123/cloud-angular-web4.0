import {Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule,} from '@angular/forms';


import {Base} from './elements/base';
import {ControlService} from './elements/control.service';
import {TextBox} from "./elements/textbox";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatCardActions} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatLabel,
    MatError,
    MatFormField,
    MatSelect,
    MatRadioButton,
    MatRadioGroup,
    MatOption,
    MatCheckbox,
    MatCardActions,
    MatButton,
    MatInput,
    NgIf,
    NgForOf,
    NgClass
  ],
  providers: [ControlService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DynamicFormComponent implements OnInit {


  @Input() formList: Base<string>[] | null = [];
  @Output() handleButtonClick: EventEmitter<string> = new EventEmitter<string>();

  form!: FormGroup;
  id: number = 1;

  constructor(private qcs: ControlService, private fb: FormBuilder) {
  }


  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
  }

  onSubmit() {
    //校验数据
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let payLoad = JSON.stringify(this.form.getRawValue());
      this.handleButtonClick.emit(payLoad);
    }
  }


  add() {
    this.id += 1;
    let textBox = TextBox.getInstance('phones' + this.id, '电话号码' + this.id, 10, false, false, 'phone', 0, 0);
    this.formList?.push(textBox);
    this.qcs.addCustomValidator(this.form, textBox);
  }

  getValueLength(key: string): number {
    const control = this.form.get(key);
    return control?.value ? control.value.length : 0;
  }
}
