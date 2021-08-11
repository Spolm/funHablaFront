import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Victim } from 'src/app/models/victim';
//import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-victims',
  templateUrl: './victims.component.html',
  styleUrls: ['./victims.component.scss']
})
export class VictimsComponent implements OnInit {

  apiUrl = environment.apiUrl;
  constructor(
    private oHttp: HttpClient,
  ) {

  }

  victimList: Victim[];
  // Http Options
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   }

  ngOnInit(): void {
   this.getVictims();
  }

  // HttpClient API get() method => Fetch victims list
  getVictims() //: Observable<Victim>
  {
    return this.oHttp.get<Victim>(this.apiUrl + 'victimList?name',  {observe: 'response'}).subscribe(resp => {
      // display its headers
      const victims = resp;
      console.log(victims);
    }); 
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
