import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import {FormField} from '../../model/form.field';
import {Task} from '../../model/task';
import {DynamicFormService} from '../../dynamic-form.service';

@Component({
  selector: 'app-dynamic-form-view',
  templateUrl: './dynamic-form-view.component.html',
  styleUrls: ['./dynamic-form-view.component.scss'],
})
export class DynamicFormViewComponent implements OnInit {
  richViewKeys: string[] = [];
  @Input() formFields: FormField[] = [];
  @Input() task: Task = new Task();
  @Output() ready = new EventEmitter();
  form!: FormGroup;
  subscription$!: Subscription;

  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {
    this.formFields = this.formFields.filter(item => item.value !== '');
    this.form = this.dynamicFormService.toFormGroup(this.formFields.sort((a, b) => a.order - b.order));
    const timSubscription$: Subscription = timer(15).subscribe({
      next: () => this.ready.emit(true),
      complete: () => timSubscription$.unsubscribe(),
    });
    this.subscription$ = this.form.valueChanges
      .pipe(
        startWith(),
        tap(() => this.dynamicFormService.setInvalid(this.form.invalid))
      )
      .subscribe(() => {});
  }
}
