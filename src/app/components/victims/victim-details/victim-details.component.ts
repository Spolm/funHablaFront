import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { VictimService } from 'src/app/services/victim.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-victim-details',
  templateUrl: './victim-details.component.html',
  styleUrls: ['./victim-details.component.scss']
})
export class VictimDetailsComponent implements OnInit {

  public form: FormGroup;
  apiUrl = environment.apiUrl;
  @Input() details: any;

  constructor(
    private readonly victimService: VictimService,
    private dialog: NbDialogRef<any>
    ) { }

  ngOnInit(): void {
    this.details = this.dialog.componentRef.instance; 
  }

  close() {

  }

  onSubmit() {
    this.save(this.details);
  }

  save(model) {
    console.log("model", model);
    this.victimService.updateVictim(model.id, model).subscribe();
    // this.oHttp.put(this.apiUrl + '/victim/' + this.details.id, model);
  }

}
