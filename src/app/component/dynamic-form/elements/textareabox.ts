import {Base} from './base';

export class TextareaBox extends Base<string> {

  private static instance: TextareaBox | null = null;

  private constructor() {
    super({});
  }

  static getInstance(key: string, label: string, order: number, required: boolean, minLength: number, maxLength: number): TextareaBox {
    TextareaBox.instance = new TextareaBox();
    TextareaBox.instance.controlType = 'textareaBox'
    TextareaBox.instance.key = key;
    TextareaBox.instance.label = label;
    TextareaBox.instance.required = required;
    TextareaBox.instance.minLength = minLength;
    TextareaBox.instance.maxLength = maxLength;
    TextareaBox.instance.order = order;
    return TextareaBox.instance;
  }
}


