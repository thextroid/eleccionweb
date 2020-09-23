import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Circunscripcion } from '../models/circunscripcion';
const api="http://192.81.217.7/api/circunscripcions";
@Injectable({
	providedIn: 'root'
})
export class CircunscripcionesService {

	
	constructor(private  http: HttpClient) { }

	all():Observable<Circunscripcion[]>{
		return this.http.get<Circunscripcion[]>(api+"");
	}
	get(id):Observable<Circunscripcion>{
		return this.http.get<Circunscripcion>(api+"/"+id);
	}
	save(data):Observable<Circunscripcion>{
		return this.http.post<Circunscripcion>(api,data); 
	}
	update(id,data):Observable<Circunscripcion>{
		return this.http.put<Circunscripcion>(api+"/"+id,data);
	}
}
