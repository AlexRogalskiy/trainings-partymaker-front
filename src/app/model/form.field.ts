export class FormField {
  type: string;
  value: any;
  order: number;
  key: string;
  label: string;
  camVariableType: string;
  required: boolean;
  style: string;
  options: { value: any; label: string }[];
  mask: string;
  uiType: string;
  constructor() {
    this.type = '';
    this.order = 0;
    this.key = '';
    this.label = '';
    this.camVariableType = '';
    this.required = false;
    this.style = '';
    this.options = [];
    this.mask = '';
    this.uiType = '';
  }
}
