import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';

const API = '127.0.0.1:8080/api/users'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }
  getAll(orderCol:String,ordername:String,status:Number, records:Number, page:Number, search:String,){
    
    return this.http.get('${API}?ordercol='+orderCol+'&orderName='+ordername+'&status='+status+'&records='+records+'&page='+page+'&search='+search);
  }
  getUser(_id):Observable<User>{
    return this.http.get<User>('${API}/'+_id);
  }
  save(user):Observable<User>{
    return this.http.post<User>('${API}',user);
  }
  edit(user):Observable<User>{
    return this.http.put<User>('${API}/'+user.ci,user);
  }
  delete(ci):Observable<User>{
    return this.http.delete<User>('${API}/'+ci);
  }
  security(ci,login,clave){
    return this.http.post('${API}/security',{'ci':ci,'login':login,'clave':clave});
  }
}