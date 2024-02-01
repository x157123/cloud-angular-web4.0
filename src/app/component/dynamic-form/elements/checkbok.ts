import { Base } from './base';

export class CheckBox extends Base<string> {
  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): CheckBox {
    CheckBox.instance = new CheckBox();
    CheckBox.instance.controlType = 'checkBox'
    CheckBox.instance.key = key;
    CheckBox.instance.label = label;
    CheckBox.instance.required = required;
    CheckBox.instance.order = order;
    CheckBox.instance.options = options;
    return CheckBox.instance;
  }
}


