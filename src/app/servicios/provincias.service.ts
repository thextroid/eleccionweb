import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';
const api="https://www.controlelectoralcctarija.com/api/provincias";
@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  
  constructor(private  http: HttpClient) { }

  all():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(api+"");
  }
  get(id){
    return this.http.get<Provincia>(api+"/"+id);
  }
  save(data){
    return this.http.post<Provincia>(api,data); 
  }
  update(id,data){
  	return this.http.put<Provincia>(api+"/"+id,data);
  }
}
