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
    mode: 'external',
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
        title: 'Fecha',
        type: 'date'
      }
    },
    actions: {
      position: 'right',
      edit: true,
      delete: true
    },
    add: {
      addButtonContent: '<i class="plus-outline"></i>',
    },
    delete: {
      confirmDelete: true
    }

  };

  data = [
    {
      expedient: 1,
      doctor: "Leanne Graham",
      patient: "Bret",
      date: "27/10/2021"
    },
    {
      expedient: 2,
      doctor: "Ervin Howell",
      patient: "Antonette",
      date: "27/10/2021"
    },
    
    
    {
      expedient: 3,
      doctor: "Nicholas DuBuque",
      patient: "Nicholas.Stanton",
      date: "27/10/2021"
    }
  ]

  openModal() {
    console.log("Detalles");
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
