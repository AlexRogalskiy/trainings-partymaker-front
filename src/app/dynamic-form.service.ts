import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class DynamicFormService {
  private invalid = new BehaviorSubject<boolean>(true);

  constructor() {}

  setInvalid(value: boolean): void {
    this.invalid.next(value);
  }

  getInvalid(): Observable<boolean> {
    return this.invalid.asObservable();
  }

  toFormGroup(formFields: any[]): FormGroup {
    const group: any = {};
    let array = [];
    formFields.forEach(formField => {
      if (formField.type !== 'array') {
        group[formField.key] = formField.required
          ? new FormControl(formField.value || '', [Validators.required])
          : new FormControl(formField.value || '');
      }
      if (formField.type === 'array') {
        for (const val of formField.value) {
          for (const attr of Object.keys(val)) {
            array.push(val[attr]);
          }
        }
        array = [];
      }
    });
    return new FormGroup(group);
  }
}
