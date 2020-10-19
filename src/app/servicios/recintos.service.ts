import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recinto } from "../models/recinto";

const api = "https://www.controlelectoralcctarija.com/api/recintos";
@Injectable({
  providedIn: "root",
})
export class RecintosService {
  constructor(private http: HttpClient) {}

  all(): Observable<Recinto[]> {
    return this.http.get<Recinto[]>(api + "");
  }
  get(id) {
    return this.http.get<Recinto>(api + "/" + id);
  }
  save(data) {
    return this.http.post<Recinto>(api, data);
  }
  update(id, data) {
    return this.http.put<Recinto>(api + "/" + id, data);
  }
  aperturarMesa(idrec,data){
    return this.http.put<any>(`https://www.controlelectoralcctarija.com/api/recintos/${idrec}/mesa`,data);
  }
}
