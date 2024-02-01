export class Base<T> {
  value: T|undefined;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  validator: string;
  minLength: number;
  maxLength: number;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      minLength?: number;
      maxLength?: number;
      validator?: string;
      options?: {key: string, value: string}[];
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.minLength = options.minLength === undefined ? 0 : options.minLength;
    this.maxLength = options.maxLength === undefined || options.maxLength == 0 ? 5000 : options.maxLength;
    this.validator = options.validator || '';
    this.options = options.options || [];
  }
}


