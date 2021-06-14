import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  settings = {
    columns: {
      expedient: {
        title: 'Nº de Expediente'
      },
      doctor: {
        title: 'Tratante'
      },
      patient: {
        title: 'Nombre del Paciente'
      },
      date: {
        title: 'Fecha'
      }
    },
    actions: {
      position: 'right',
      add: true,
      edit: false,
      delete: false
    }
  };

  data = [
    {
      expedient: 1,
      doctor: "Leanne Graham",
      patient: "Bret",
      date: "Sincere@april.biz"
    },
    {
      expedient: 2,
      doctor: "Ervin Howell",
      patient: "Antonette",
      date: "Shanna@melissa.tv"
    },
    
    
    {
      expedient: 3,
      doctor: "Nicholas DuBuque",
      patient: "Nicholas.Stanton",
      date: "Rey.Padberg@rosamond.biz"
    }
  ]

  openModal() {
    console.log("ASI ES")
  }

}
