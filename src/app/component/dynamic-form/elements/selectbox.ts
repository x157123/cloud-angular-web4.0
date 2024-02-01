import { Base } from './base';

export class SelectBox extends Base<string> {

  private static instance: any;

  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): SelectBox {
    SelectBox.instance = new SelectBox();
    SelectBox.instance.controlType = 'selectBox'
    SelectBox.instance.key = key;
    SelectBox.instance.label = label;
    SelectBox.instance.required = required;
    SelectBox.instance.order = order;
    SelectBox.instance.options = options;
    return SelectBox.instance;
  }
}


