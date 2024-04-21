import {Base} from './base';

export class TextBox extends Base<string> {

  private static instance: TextBox | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean, phonetics: boolean, validator: string, minLength: number, maxLength: number,associationKey: string, associationValue: string): TextBox {
    TextBox.instance = new TextBox();
    TextBox.instance.controlType = 'textBox'
    TextBox.instance.key = key;
    TextBox.instance.label = label;
    TextBox.instance.validator = validator;
    TextBox.instance.required = required;
    TextBox.instance.minLength = minLength;
    TextBox.instance.maxLength = maxLength;
    TextBox.instance.order = order;
    TextBox.instance.phonetics = phonetics;
    TextBox.instance.associationKey = associationKey;
    TextBox.instance.associationValue = associationValue;
    return TextBox.instance;
  }
}


