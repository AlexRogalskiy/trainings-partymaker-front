import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {FormField} from '../../model/form.field';

@Component({
  selector: 'app-camunda-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss'],
})
export class DynamicFormFieldComponent implements OnInit {
  @Input() formField!: FormField;
  @Input() form!: FormGroup;

  @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
