import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';
const api="https://www.controlelectoralcctarija.com/api/localidades";
@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  
  constructor(private  http: HttpClient) { }

  all():Observable<Localidad[]>{
    return this.http.get<Localidad[]>(api+"");
  }
  get(id){
    return this.http.get<Localidad>(api+"/"+id);
  }
  save(data){
    return this.http.post<Localidad>(api,data); 
  }
  update(id,data){
  	return this.http.put<Localidad>(api+"/"+id,data);
  }
}
