import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule,} from '@angular/forms';


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
  @Input() jsonData: string = "";
  @Output() handleButtonClick: EventEmitter<string> = new EventEmitter<string>();

  form!: FormGroup;
  id: number = 1;
  checkboxMap: Map<string, Array<string>> = new Map();

  constructor(private qcs: ControlService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
    console.log('form', this.jsonData)
    const data = JSON.parse(this.jsonData);
    this.form.setValue(data);

  }

  onSubmit() {
    //校验数据
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const json = this.form.getRawValue();
      this.checkboxMap.forEach((value, key) => {
        json[key] = value;
      });
      let payLoad = JSON.stringify(json);
      this.handleButtonClick.emit(payLoad);
    }
  }

  refreshForm() {
    this.form.clearValidators();
    this.ngOnInit()
  }


  add(index: number) {
    this.id += 1;
    let textBox = TextBox.getInstance('phones' + this.id, '电话号码' + this.id, 10, true, false, 'phone', 0, 0);
    if (index === -1) {
      this.formList?.push(textBox);
    } else {
      //添加到指定位置index
      this.formList?.splice(index + 1, 0, textBox);
    }
    this.qcs.addCustomValidator(this.form, textBox);
  }

  delForm(index: number) {
    this.formList?.splice(index, 1);
    this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
  }

  onCheckboxChange(event: any, key: string, value: string) {
    if (event.checked) {
      let arrs: string[] | undefined = this.checkboxMap.get(key);
      if (arrs) {
        arrs.push(value);
      } else {
        this.checkboxMap.set(key, [value]);
      }
    } else {
      let arrs: string[] | undefined = this.checkboxMap.get(key);
      if (arrs) {
        arrs.splice(arrs.indexOf(value), 1);
      } else {
        this.checkboxMap.set(key, []);
      }
    }
  }

  getValueLength(key: string): number {
    const control = this.form.get(key);
    return control?.value ? control.value.length : 0;
  }
}
