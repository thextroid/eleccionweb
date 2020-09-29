import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
const api = "http://192.81.217.7/api/votacion";
@Injectable({
  providedIn: "root",
})
export class VotacionService {
  constructor(private http: HttpClient) {}
  all():Observable<any>{
    return this.http.get<any>(api);
  }
  upload(data):Observable<any> {
    return this.http.post<any>(api, data);
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
