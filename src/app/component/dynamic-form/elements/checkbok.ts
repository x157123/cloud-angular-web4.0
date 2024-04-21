import { Base } from './base';

export class CheckBox extends Base<string> {
  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, phonetics: boolean, options: {key: string, value: string}[],associationKey: string, associationValue: string): CheckBox {
    CheckBox.instance = new CheckBox();
    CheckBox.instance.controlType = 'checkBox'
    CheckBox.instance.key = key;
    CheckBox.instance.label = label;
    CheckBox.instance.required = required;
    CheckBox.instance.order = order;
    CheckBox.instance.options = options;
    CheckBox.instance.phonetics = phonetics;
    CheckBox.instance.associationKey = associationKey;
    CheckBox.instance.associationValue = associationValue;
    return CheckBox.instance;
  }
}


