import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://192.81.217.7/api/reportes";
@Injectable({
  providedIn: "root",
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getRecintos(rec, ele): any {
    return this.http.get<any>(`${API}?eleccion=${ele}&recinto=${rec}`);
  }
  getProvincias(prov, ele): any {
    return this.http.get<any>(`${API}?eleccion=${ele}&provincia=${prov}`);
  }
  getMunicipios(mun, ele): any {
    return this.http.get<any>(`${API}?eleccion=${ele}&municipio=${mun}`);
  }
  // getCircunscripciones(cir, ele): any {
  //   return this.http.get<any>(`${API}?eleccion=${ele}&recinto=${rec}`);
  // }
}
