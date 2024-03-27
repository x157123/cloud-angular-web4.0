import {Base} from './base';

export class NumberBox extends Base<string> {

  private static instance: NumberBox | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean, phonetics: boolean, validator: string, minLength: number, maxLength: number): NumberBox {
    NumberBox.instance = new NumberBox();
    NumberBox.instance.controlType = 'numberBox'
    NumberBox.instance.key = key;
    NumberBox.instance.label = label;
    NumberBox.instance.validator = validator;
    NumberBox.instance.required = required;
    NumberBox.instance.minLength = minLength;
    NumberBox.instance.maxLength = maxLength;
    NumberBox.instance.order = order;
    NumberBox.instance.type = 'number';
    NumberBox.instance.phonetics = phonetics;
    return NumberBox.instance;
  }
}


