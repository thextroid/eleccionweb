import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
const api = "http://192.81.217.7/api";
const apivot = "/votacion";
@Injectable({
  providedIn: "root",
})
export class VotacionService {
  constructor(private http: HttpClient) {}
  all():Observable<any>{
    return this.http.get<any>(api+apivot);
  }
  get(idvotacion){
    return this.http.get(api+apivot+"/"+idvotacion);
  }
  getMesas(idrec):Observable<any>{
    return  this.http.get<any>(api+"/votacion/recinto/"+idrec);
  }
  downloadImage(codigo){
    return this.http.get(api+"/actas/image/"+codigo,{responseType:'blob'});
  }
  uploadVotos(data):Observable<any> {
    return this.http.post<any>(api+apivot, data);
  }
  uploadFile(file,idacta){
    return  this.http.put<any>(api+"/actas/image/"+idacta,file);
    
  }
  updateVotos(id,data):Observable<any> {
    return this.http.put<any>(api+apivot+"/"+id, data);
  }
  uploadActa(data){
    return this.http.post<any>(api+"/actas",data);
  }
  updateActa(id,data){
    return this.http.put<any>(api+"/actas/"+id,data);
  }


  file(id,data):Observable<any>{
    let headers = new HttpHeaders();
//this is the important step. You need to set content type as null
headers.set('Content-Type', null);
headers.set('Accept', "multipart/form-data");
let params = new HttpParams();
    return this.http.put("http://192.81.217.7/api/actas/"+id,data,{params,headers});
  }
}
