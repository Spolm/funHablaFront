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

  settings = {
    mode: 'external',
    columns: {
      expedient_number: {
        title: 'Nº de expediente'
      },
      name: {
        title: 'Nombre'
      },
      second_name: {
        title: 'Segundo nombre'
      },
      lastname: {
        title: 'Apellido'
      },
      age: {
        title: 'Edad'
      },
      occupation: {
        title: 'Ocupación'
      },
      phone_number: {
        title: 'Nº de telefono'
      },
      phone_number2: {
        title: 'Nº de telefono 2'
      },
      email: {
        title: 'Correo Electronico'
      },
      birthdate: {
        title: 'Fecha de Nacimiento'
      },
      reference: {
        title: 'Referencia'
      },
    },
    actions: {
      position: 'right',
      add:true,
      edit: true,
      delete: true
    },
    delete: {
      confirmDelete: true
    }

  };
  victimList;
  // Http Options
  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json'
     })
   }

  ngOnInit(): void {
    this.victimList = this.getVictims()
    
    
  }

  // HttpClient API get() method => Fetch victims list
  getVictims()
  {
    this.oHttp.get<Victim>(this.apiUrl + 'victimList/?name',  {observe: 'response'}).toPromise().then(res =>
      {
        this.victimList = res.body;
        console.log(this.victimList)
      })
    // .subscribe(resp => {
    //   const victims = resp.body[0];
    //   this.victimList = victims as Victim[];
    //   console.log(this.victimList)
      
    //   return this.victimList
    // }); 
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
