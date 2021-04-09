import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../app.contstants';

@Injectable({providedIn: 'root'})
export class CamundaRestService {

  private camundaEngineUrl = SERVER_API_URL + '/engine-rest/task';


  constructor(
    private http: HttpClient
  ) {
  }

  getProcess(processDefinitionId: string): Observable<any> {
    return this.http.get<any>(`${this.camundaEngineUrl}/${processDefinitionId}`);
  }

  getTask(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.camundaEngineUrl}/${taskId}`, {observe: 'response'});
  }

  getTaskFormRendered(taskId: string): Observable<any> {
    return this.http.get(`${this.camundaEngineUrl}/${taskId}/rendered-form`, {responseType: 'text', observe: 'response'});
  }

  getTaskFormVariables(taskId: string): Observable<any> {
    return this.http.get<any>(`${this.camundaEngineUrl}/${taskId}/form-variables`, {observe: 'response'});
  }

  getTasks(): Observable<any> {
    return this.http.get(`${this.camundaEngineUrl}/`);
  }

  submitTask(formToSubmit: any, taskId: string): Observable<any> {
    return this.http.post(`${this.camundaEngineUrl}/${taskId}/submit-form`, formToSubmit, {observe: 'response'});
  }
}
