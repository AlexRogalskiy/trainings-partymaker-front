import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DynamicFormFieldComponent} from './dynamic-form-field/dynamic-form-field.component';
import {DynamicFormViewComponent} from './dynamic-form-view/dynamic-form-view.component';
import {CustomTaskComponent} from './custom-task/custom-task.component';
import {CustomTaskListComponent} from './custom-task-list/custom-task-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    DynamicFormFieldComponent,
    DynamicFormViewComponent,
    CustomTaskComponent,
    CustomTaskListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomTaskListComponent
      },
      {
        path: ':id',
        component: CustomTaskComponent
      }
    ]),
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
  ]
})
export class CamundaModule { }
