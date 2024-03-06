import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Base URL for the API
  private apiUrl = 'https://localhost:44370/';

  constructor(private http: HttpClient) {}

  // get all task from api
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl + 'api/tasks');
  }

  //get task by id from api
  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl + 'api/tasks'}/${id}`);
  }

  // Add a new task
  addTask(task: Task): Observable<Task> {
    task.id = crypto.randomUUID();
    return this.http.post<Task>(`${this.apiUrl}api/tasks`, task);
  }

  // Update an existing task
  updateTask(id: string, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}api/tasks/${id}`, task);
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}api/tasks/${id}`);
  }
}
