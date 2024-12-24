import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,} from '@angular/forms';


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
import {BehaviorSubject} from "rxjs";

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css'],
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DynamicFormComponent implements OnInit {


  @Input()
  set formList(value: Base<string>[] | null) {
    this._formList.next(value || []);
  }

  get formList() {
    return this._formList.getValue();
  }

  private _formList = new BehaviorSubject<Base<string>[]>([]);

  @Input() jsonData: string = "";

  @Output() handleButtonClick: EventEmitter<string> = new EventEmitter<string>();

  form!: FormGroup;
  id: number = 1;
  checkboxMap: Map<string, Array<string>> = new Map();

  constructor(private qcs: ControlService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this._formList.subscribe(formList => {
      // 当formList变化时执行的逻辑
      console.log('formList has changed:', formList);
    });
    this.setDate();
  }

  setDate() {
    if (this.jsonData != null && this.jsonData.length > 0) {
      let data = JSON.parse(this.jsonData);
      this.formList?.forEach((value) => {
        if (value.controlType === 'checkBox') {
          data[value.key]?.forEach((v: string) => {
            this.onCheckboxChange({checked: true}, value.key, v);
            value.options.forEach((option) => {
              if (option.key === v) {
                option.checked = true;
              }
            })
          })
        } else {
          if (!data[value.key]) {
            data[value.key] = '';
          }
        }
      });
      this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
      this.form.setValue(data);
    } else {
      this.form = this.qcs.toFormGroup(this.formList as Base<string>[]);
    }
  }

  onSubmit() {
    //校验数据
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.getJsonData();
      this.handleButtonClick.emit(this.jsonData);
    }else{
      console.log("校验错误");
    }
  }

  getJsonData() {
    const json = this.form.getRawValue();
    this.checkboxMap.forEach((value, key) => {
      json[key] = value;
    });
    this.jsonData = JSON.stringify(json);
    return this.jsonData;
  }

  refreshForm() {
    this.form.clearValidators();
    this.ngOnInit()
  }


  add(index: number) {
    this.id += 1;
    let textBox = TextBox.getInstance('param' + this.id, '参数' + this.id, index + 1, false, false, '', 0, 0, '', '');
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
      let data: string[] | undefined = this.checkboxMap.get(key);
      if (data && data.indexOf(value) === -1) {
        data.push(value);
      } else {
        this.checkboxMap.set(key, [value]);
      }
    } else {
      let data: string[] | undefined = this.checkboxMap.get(key);
      if (data) {
        data.splice(data.indexOf(value), 1);
        if (data.length === 0) {
        }
      } else {
        this.checkboxMap.set(key, []);
      }
    }
    let data: string[] | undefined = this.checkboxMap.get(key);
    if (data && data.length > 0) {
      this.form?.get(key)?.setValue("1");
    } else {
      this.form?.get(key)?.setValue(null);
    }
  }

  getValueLength(key: string): number {
    const control = this.form.get(key);
    return control?.value ? control.value.length : 0;
  }

}
