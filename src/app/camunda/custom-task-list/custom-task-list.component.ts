import { Component, OnInit } from '@angular/core';
import {CamundaRestService} from '../camunda-rest.service';

@Component({
  selector: 'app-custom-task-list',
  templateUrl: './custom-task-list.component.html',
  styleUrls: ['./custom-task-list.component.css']
})
export class CustomTaskListComponent implements OnInit {

  constructor(
    private camundaRestService: CamundaRestService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    this.camundaRestService.getTasks().subscribe({
      next: response =>  {
        if (response.ok) {
          console.log(response.body);
        }
      }
    });
  }

}
