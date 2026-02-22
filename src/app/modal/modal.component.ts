import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EvtService } from 'src/services/evt.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  form!:FormGroup
  constructor(private dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) data: any,private evtService:EvtService) {
    if (data) {
      this.evtService.getEventById(data).subscribe((event) => {
        this.form=new FormGroup({
          titre: new FormControl(event.titre),
          dateDebut: new FormControl(event.dateDebut),
          dateFin: new FormControl(event.dateFin),
          lieu: new FormControl(event.lieu)
        });
      });
    } else {
    
      this.form=new FormGroup({
        titre: new FormControl(null),
        dateDebut: new FormControl(null),
        dateFin: new FormControl(null),
        lieu: new FormControl(null)
      });
    }
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
  close() {
    this.dialogRef.close();
  }


}
