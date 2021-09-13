import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Victim } from '../models/victim';

@Injectable({
  providedIn: 'root'
})

export class VictimService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };
  apiUrl = environment.apiUrl;

  
  constructor(private oHttp: HttpClient) {
    
   }

  getVictims() : Observable<Victim[]> {
    return this.oHttp.get<Victim[]>(this.apiUrl + 'victimList/');
  }

  getVictim(id: number): Observable<Victim> {
    return this.oHttp.get<Victim>(this.apiUrl + 'victim/?id=' + id);
  }

  updateVictim(id: number, victim: Victim): Observable<Victim> {
    
    return this.oHttp.put<Victim>(this.apiUrl+'victim/?id='+id, victim, this.httpOptions)
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

  

}
