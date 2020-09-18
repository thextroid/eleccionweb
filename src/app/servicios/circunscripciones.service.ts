import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Circunscripcion } from '../models/circunscripcion';
const api="http://192.81.217.7/api/circunscripciones";
@Injectable({
  providedIn: 'root'
})
export class CircunscripcionesService {

  
  constructor(private  http: HttpClient) { }

  all():Observable<Circunscripcion[]>{
    return this.http.get<Circunscripcion[]>(api+"");
  }
  get(id){
    return this.http.get<Circunscripcion>(api+"/"+id);
  }
  save(data){
    return this.http.post(api,{name:data.name}); 
  }
  update(data){
  	return this.http.put(api+"/"+data.id,{name:data.name});
  }
}
