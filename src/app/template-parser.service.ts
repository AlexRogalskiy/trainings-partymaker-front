import { Injectable } from '@angular/core';
import {FormField} from './model/form.field';

@Injectable({providedIn: 'root'})
export class TemplateParserService {
  formVariables!: any;

  constructor() {}

  parseCamundaTemplate(rendered: string, variables: any): any {
    const formFields: FormField[] = [];
    const parsedHTML = new DOMParser().parseFromString(rendered, 'text/html');
    const HTML = parsedHTML.getElementsByTagName('*');
    for (let i = 0; i < HTML.length; i++) {
      if (HTML[i].tagName === 'LABEL') {
        const formField: FormField = new FormField();

        formField.order = i;
        formField.label = HTML[i].innerHTML.trim();
        formFields.push(formField);
      }
    }
    let c = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < HTML.length; i++) {
      const select = HTML[i].getElementsByTagName('select');
      if (select.item(0)?.parentElement?.innerHTML.includes(formFields[c].label)) {
        formFields[c].key = select.item(0).name;
        formFields[c].uiType = 'select';
        formFields[c].required = true;
        if (!formFields[c].options.length) {
          for (let j = 0; j < select.item(0).options.length; j++) {
            const currentOption = select.item(0).options.item(j);
            formFields[c].options.push({
              value: currentOption.value === 'null' ? null : currentOption.value,
              label: currentOption.label,
            });
          }
        }
        c++;
      }
      if (HTML[i].tagName === 'INPUT') {
        if (HTML[i].hasAttribute('NAME')) {
          formFields[c].key = HTML[i].getAttribute('NAME');
        }
        if (HTML[i].hasAttribute('required')) {
          formFields[c].required = true;
        }
        c++;
      }
    }
    this.addDataFromVariables(variables, formFields);
    return formFields;
  }

  addDataFromVariables(variables: any, formFields: FormField[]): void {
    for (const k of Object.keys(variables)) {
      this.formVariables = variables;
      for (const formField of formFields) {
        if (formField.key === k) {
          formField.type = variables[k].type.toLowerCase();
          if (formField.uiType.trim() === '') {
            formField.uiType = variables[k].type.toLowerCase() === 'string' ? 'textarea' : variables[k].type.toLowerCase();
          }
          formField.value = variables[k].value === 'null' ? null : variables[k].value;
        }
      }
    }
  }

  // createFormFieldFromVariables(variables: any): FormField[] {
  //   const formFields: FormField[] = [];
  //   // eslint-disable-next-line no-console
  //   console.log(variables);
  //   const keys = Object.keys(variables);
  //   for (const key of keys) {
  //     const formField = new FormField();
  //     formField.key = key;
  //     formField.camVariableType = variables[key].type;
  //     formField.uiType = variables[key].type.toLowerCase();
  //     formField.value = variables[key].value;
  //     formFields.push(formField);
  //   }
  //   return formFields;
  // }

}
