import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Victim } from '../models/victim';

@Injectable({
  providedIn: 'root'
})
export class VictimService {

  apiUrl = environment.apiUrl;

  constructor(private oHttp: HttpClient) { }

  getVictims() : Observable<Victim[]> {
    return this.oHttp.get<Victim[]>(this.apiUrl + 'victimList/');
  }

  getVictim(id: number): Observable<Victim> {
    return this.oHttp.get<Victim>(this.apiUrl + 'victim/?id=' + id);
  }

  updateVictim(id: number, body) {
    console.log(body.id)
    return this.oHttp.put<Victim>(this.apiUrl+'victim/?id='+id, body).subscribe( data =>
      body.id = data.id);;
  }

  

}
