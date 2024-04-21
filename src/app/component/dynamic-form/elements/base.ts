export class Base<T> {
  value: T | undefined;
  //键
  key: string;
  //标签
  label: string;
  //是否必填
  required: boolean;
  //顺序
  order: number;
  //控件类型
  controlType: string;
  //类型
  type: string;
  //验证器
  validator: string;
  //文字最短、数字最小值
  minLength: number;
  //文字最长、数字最大值
  maxLength: number;
  //占用一行
  phonetics: boolean;
  //多选 选项
  options: { key: string, value: string, checked?: boolean }[];
  //关联key
  associationKey: string;
  //关联选项
  associationValue: string;

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
    phonetics?: boolean;
    validator?: string;
    options?: { key: string, value: string, checked?: boolean }[];
    associationKey?: string;
    associationValue?: string;
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
    this.phonetics = !!options.phonetics;
    this.options = options.options || [];
    this.associationKey = options.associationKey || '';
    this.associationValue = options.associationValue || '';
  }
}


