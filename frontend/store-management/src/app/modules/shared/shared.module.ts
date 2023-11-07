import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpDeleteComponent } from './pop-up-delete/pop-up-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from './components/button/button.component';



@NgModule({
  declarations: [
    PopUpDeleteComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule

  ],
  exports: [PopUpDeleteComponent, ButtonComponent]
})
export class SharedModule { }
