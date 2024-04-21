import {Base} from './base';

export class SelectBox extends Base<string> {

  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, phonetics: boolean, options: {
    key: string,
    value: string
  }[], associationKey: string, associationValue: string): SelectBox {
    SelectBox.instance = new SelectBox();
    SelectBox.instance.controlType = 'selectBox'
    SelectBox.instance.key = key;
    SelectBox.instance.label = label;
    SelectBox.instance.required = required;
    SelectBox.instance.order = order;
    SelectBox.instance.options = options;
    SelectBox.instance.phonetics = phonetics;
    SelectBox.instance.associationKey = associationKey;
    SelectBox.instance.associationValue = associationValue;
    return SelectBox.instance;
  }
}


