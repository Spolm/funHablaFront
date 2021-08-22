import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Victim } from 'src/app/models/victim';
import { VictimService } from 'src/app/services/victim.service';
import { VictimDetailsComponent } from './victim-details/victim-details.component';

@Component({
  selector: 'app-victims',
  templateUrl: './victims.component.html',
  styleUrls: ['./victims.component.scss']
})
export class VictimsComponent implements OnInit {

  // public config: GridNg2SmartTableConfigUtil;
  constructor(
    private readonly victimService: VictimService,
    private dialogService: NbDialogService
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
    this.getVictims();
  }

  // HttpClient API get() method => Fetch victims list
  getVictims()
  {
    this.victimService.getVictims().subscribe( res => 
      {
        this.victimList = res;
      })
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

  onSelect(event, context?: any): NbDialogRef<any> {
    console.log(event.data);
    return this.dialogService.open(VictimDetailsComponent, {context: event.data})
  }

  add() {
    console.log("Nuevo");
  }

  edit() {
    console.log("Editar");
  }
  delete() {
    console.log("Borrar");
  }

 

}
