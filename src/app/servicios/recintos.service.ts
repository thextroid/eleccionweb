import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recinto } from '../models/recinto';
const api="http://192.81.217.7/api/recintos";
@Injectable({
  providedIn: 'root'
})
export class RecintosService {

  
  constructor(private  http: HttpClient) { }

  all():Observable<Recinto[]>{
    return this.http.get<Recinto[]>(api+"");
  }
  get(id){
    return this.http.get<Recinto>(api+"/"+id);
  }
  save(data){
    return this.http.post(api,data); 
  }
  update(data){
  	return this.http.put(api+"/"+data.id,{institucion:data.institucion, tipo:data.tipo})  ;
  }
}
