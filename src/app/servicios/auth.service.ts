import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API = 'http://localhost:3000/api/auth'

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http:HttpClient) { 

  }
  validLogin(user){
    return this.http.post(`${API}`,user);
  }
}
