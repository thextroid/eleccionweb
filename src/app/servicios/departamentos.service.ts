import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Departamento} from '../models/departamento';
import { Observable } from 'rxjs';
const api="http://192.81.217.7/api/departamentos";
@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(private  http: HttpClient) { }

   all():Observable<Departamento[]>{
    return this.http.get<Departamento[]>(api+"");
  }
  save(data){
    return this.http.post(api,data);
  }
  update(data){
    let a=JSON.parse(JSON.stringify({name:data.name}) );
  	return this.http.put(api+"/"+data.id,a);
  }
}