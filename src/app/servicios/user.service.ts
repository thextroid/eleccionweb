import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";

const API = "http://192.168.1.5:3000/api/users/";
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${API}`);
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(`${API}${id}`);
  }
  save(user): Observable<User> {
    return this.http.post<User>(`${API}`, user);
  }
  update(id, user: User): Observable<User> {
    return this.http.put<User>(`${API}` + id, user);
  }
}
