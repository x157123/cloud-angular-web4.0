import {Base} from './base';

export class TextBox extends Base<string> {

  private static instance: TextBox | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean, validator: string, minLength: number, maxLength: number): TextBox {
    TextBox.instance = new TextBox();
    TextBox.instance.controlType = 'textBox'
    TextBox.instance.key = key;
    TextBox.instance.label = label;
    TextBox.instance.validator = validator;
    TextBox.instance.required = required;
    TextBox.instance.minLength = minLength;
    TextBox.instance.maxLength = maxLength;
    TextBox.instance.order = order;
    return TextBox.instance;
  }
}


