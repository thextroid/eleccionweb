import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Municipio } from '../models/municipio';
const api="http://192.81.217.7/api/municipios";
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
    return this.http.post(api,{name:data.name}); 
  }
  update(data){
  	return this.http.put(api+"/"+data.id,{name:data.name});
  }
}
