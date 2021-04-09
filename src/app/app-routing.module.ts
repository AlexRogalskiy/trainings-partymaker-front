import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./camunda/camunda.module').then(m => m.CamundaModule)
      },
    ])
  ],
  exports: [RouterModule]
  })
export class AppRoutingModule{}
