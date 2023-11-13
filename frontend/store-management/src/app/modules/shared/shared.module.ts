import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUpDeleteComponent } from './components/pop-up-delete/pop-up-delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from './components/button/button.component';
import { CategoryNamePipe } from './pipes/category-name.pipe';



@NgModule({
  declarations: [
    PopUpDeleteComponent,
    ButtonComponent,
    CategoryNamePipe
    
  ],
  imports: [
    CommonModule,
    MatDialogModule

  ],
  exports: [PopUpDeleteComponent, ButtonComponent, CategoryNamePipe]
})
export class SharedModule { }
