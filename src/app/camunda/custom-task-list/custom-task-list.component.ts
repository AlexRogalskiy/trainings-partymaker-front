import {Component, OnInit} from '@angular/core';
import {CamundaRestService} from '../camunda-rest.service';

@Component({
  selector: 'app-custom-task-list',
  templateUrl: './custom-task-list.component.html',
  styleUrls: ['./custom-task-list.component.css']
})
export class CustomTaskListComponent implements OnInit {

  // dataSource = new MatTableDataSource();
  // isready = false;
  data: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'created'];
  constructor(
    private camundaRestService: CamundaRestService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }
  getTasks(): void {
    this.camundaRestService.getTasks().subscribe({
      next: response => {
        this.data = response;
        // this.dataSource.data = response;
        // this.isready = true;
      }
    });
  }

}
