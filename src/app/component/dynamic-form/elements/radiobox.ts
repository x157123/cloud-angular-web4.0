import { Base } from './base';

export class RadioBox extends Base<string> {

  private static instance: RadioBox;
  static getInstance(key: string, label: string, order: number, required: boolean, phonetics: boolean, options: {key: string, value: string}[],associationKey: string, associationValue: string): RadioBox {
    RadioBox.instance = new RadioBox();
    RadioBox.instance.controlType = 'radioBox'
    RadioBox.instance.key = key;
    RadioBox.instance.label = label;
    RadioBox.instance.required = required;
    RadioBox.instance.order = order;
    RadioBox.instance.options = options;
    RadioBox.instance.phonetics = phonetics;
    RadioBox.instance.associationKey = associationKey;
    RadioBox.instance.associationValue = associationValue;
    return RadioBox.instance;
  }
}


