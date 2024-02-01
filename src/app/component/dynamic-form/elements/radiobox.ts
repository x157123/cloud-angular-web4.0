import { Base } from './base';

export class RadioBox extends Base<string> {

  private static instance: RadioBox;
  static getInstance(key: string, label: string, order: number, required: boolean, options: {key: string, value: string}[]): RadioBox {
    RadioBox.instance = new RadioBox();
    RadioBox.instance.controlType = 'radioBox'
    RadioBox.instance.key = key;
    RadioBox.instance.label = label;
    RadioBox.instance.required = required;
    RadioBox.instance.order = order;
    RadioBox.instance.options = options;
    return RadioBox.instance;
  }
}


