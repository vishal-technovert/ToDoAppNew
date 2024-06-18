import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}Tasks`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTasksByUsername(username: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/${username}`);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  
}

export interface Task {
  id: number;
  username: string;
  title: string;
  description: string;
  status: boolean;
  date: Date;
}


