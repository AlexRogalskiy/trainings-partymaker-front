import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormField} from '../../model/form.field';
import {Subscription} from 'rxjs';
import {Task} from '../../model/task';
import {Process} from '../../model/process';
import {FormGroup} from '@angular/forms';
import {DynamicFormViewComponent} from '../dynamic-form-view/dynamic-form-view.component';
import {CamundaRestService} from '../camunda-rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TemplateParserService} from '../../template-parser.service';
import {DynamicFormService} from '../../dynamic-form.service';

@Component({
  selector: 'app-custom-task',
  templateUrl: './custom-task.component.html',
  styleUrls: ['./custom-task.component.css']
})
export class CustomTaskComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  formFields: FormField[] = [];
  formValidSubscription$: Subscription;
  showForm = false;
  formInvalid = true;
  formVariables!: any;
  taskObject: Task = new Task();
  processObject: Process = new Process();
  fg: FormGroup;
  @ViewChild(DynamicFormViewComponent) dfc!: DynamicFormViewComponent;
  outputs: any[] = [];
  constructor(
    private camundaRestService: CamundaRestService,
    private route: ActivatedRoute,
    private router: Router,
    private templateParserService: TemplateParserService,
    private dynamicFormService: DynamicFormService
  ) {
  }

  ngOnInit(): void {
    this.getTask();
    this.formValidSubscription$ = this.dynamicFormService.getInvalid().subscribe({ next: value => (this.formInvalid = value) });
  }

  getTask(): void {
    this.camundaRestService.getTask(this.id).subscribe(
      task => {
        if (!task) {
          return;
        }
        this.taskObject = task.body;
        this.getFormRendered();
        this.camundaRestService.getProcess(this.taskObject.processDefinitionId).subscribe(process => {
          this.processObject = process;
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  submitTask(): void {
    let formToSubmit;
    const fg = {};
    if (this.formVariables) {
      for (const key of Object.keys(this.formVariables)) {
        if (this.dfc.form.controls[key]) {
          this.formVariables[key].value = this.dfc.form.controls[key].value;
          fg[key] = this.formVariables[key];
        }
      }
      formToSubmit = { variables: fg };
      this.camundaRestService.submitTask(formToSubmit, this.id).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  getFormRendered(): void {
    this.camundaRestService.getTaskFormRendered(this.id).subscribe(
      rendered => {
        if (rendered.ok) {
          this.getFormVariables(rendered.body);
        }
      },
      () => {
        console.log('Не найдена отрисованная форма');
      }
    );
  }
  getFormVariables(renderForm: string | null): void {
    this.camundaRestService.getTaskFormVariables(this.id).subscribe(variables => {
      this.formVariables = variables.body;
      if (renderForm) {
        this.formFields = this.templateParserService.parseCamundaTemplate(renderForm, variables.body);
      }
      this.showForm = true;
    });
  }

}
