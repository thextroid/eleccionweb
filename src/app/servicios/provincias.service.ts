import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';
const api="http://192.81.217.7/api/provincias";
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
    return this.http.post<Provincia>(api,{name:data.name}); 
  }
  update(id,data){
  	return this.http.put<Provincia>(api+"/"+id,{name:data.name});
  }
}
