import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
const api = "http://192.81.217.7/api/provincias";
@Injectable({
  providedIn: "root",
})
export class VotacionService {
  constructor(private http: HttpClient) {}

  upload(data) {
    return this.http.post(api, data);
  }
}
