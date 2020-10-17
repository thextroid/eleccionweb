import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
const API = "http://192.81.217.7/api/auth";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  validLogin(user) {
    return this.http.post(`${API}`, user);
  }
  logoutUser() {
    localStorage.removeItem("access_token");
    this.router.navigate(["login"]);
    return this.http.get(`${API}`);
  }

  loggIn(): boolean {

    return localStorage.getItem("access_token") !== null;
  }
}
