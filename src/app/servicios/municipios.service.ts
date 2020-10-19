import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio';
const api="https://www.controlelectoralcctarija.com/api/municipios";
@Injectable({
  providedIn: 'root'
})
export class MunicipiosService {

  
  constructor(private  http: HttpClient) { }

  all():Observable<Municipio[]>{
    return this.http.get<Municipio[]>(api+"");
  }
  get(id){
    return this.http.get<Municipio>(api+"/"+id);
  }
  save(data){
    return this.http.post<Municipio>(api,data); 
  }
  update(id,data){
  	return this.http.put<Municipio>(api+"/"+id,data);
  }
}
