import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';

const API = 'http://localhost:3000/api/users/'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }
  getAll():Observable<User[]>{
    return this.http.get<User[]>(`${API}`);
  }
  getUser(id):Observable<User>{
    return this.http.get<User>(`${API}${id}`);
  }
  save(user):Observable<User>{    
    return this.http.post<User>(`${API}`,user);
  }
  edit(user):Observable<User>{
    return this.http.put<User>(`${API}`+user.ci,user);
  }  
}