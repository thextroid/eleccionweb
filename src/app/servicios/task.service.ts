import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task";

const API = "http://localhost:3000/api/tasks/";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTaskByUser(userId) {
    return this.http.get<Task>(`${API}user/${userId}`);
  }
  updateTaskByUser(id, task): Observable<Task> {
    return this.http.put<Task>(`${API}user/${id}`, task);
  }
  save(task): Observable<Task> {
    return this.http.post<Task>(`${API}`, task);
  }
}
