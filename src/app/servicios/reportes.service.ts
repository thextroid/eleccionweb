import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const API = "http://192.168.1.4:3000/api/reportes";
@Injectable({
  providedIn: "root",
})
export class ReportesService {
  constructor(private http: HttpClient) {}

  getRecintos(id): any {
    return this.http.get<any>(`${API}?eleccion=presidente&recinto=${id}`);
  }
  getPresidenteProvincia(id): any {
    return this.http.get<any>(`${API}?eleccion=presidente&provincia=${id}`);
  }
  getPresidenteMunicipio(id): any {
    return this.http.get<any>(`${API}?eleccion=presidente&municipio=${id}`);
  }
  getPresidenteRecinto(id): any {
    return this.http.get<any>(`${API}?eleccion=presidente&recinto=${id}`);
  }
  getWiner(id): any {
    return this.http.get<any>(`${API}/recinto/${id}`);
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
