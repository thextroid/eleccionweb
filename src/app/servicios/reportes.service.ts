import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://192.81.217.7/api/reportes";
@Injectable({
  providedIn: "root",
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getRecintos(id): any {
    return this.http.get<any>(`${API}?eleccion=presidente&recinto=${id}`);
  }
  getWiner(id): any {
    return this.http.get<any>(`${API}/recinto/${id}`);
  }
}
