import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-pop-up-delete',
  templateUrl: './pop-up-delete.component.html',
  styleUrls: ['./pop-up-delete.component.css']
})
export class PopUpDeleteComponent {

  constructor(public dialogRef: MatDialogRef<PopUpDeleteComponent>) {

  }

}
