import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../models/customer';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDeleteComponent } from 'src/app/modules/shared/pop-up-delete/pop-up-delete.component';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css', '../../../shared/shared.style.css']
})
export class CustomerListComponent {

  customers$: Observable<any> = this.customerService.getAll();

  public displayedColumns: string[] = ['Customer Name', 'Customer Address', 'Total Ordered Cost', 'Orders Count', 'Action'];

  dataSource: MatTableDataSource<any>;

  constructor(private customerService: CustomerService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Customer>();

  }
  public deleteCustomer(customer: Customer) {

    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customerService.delete(customer.id).pipe(take(1)).subscribe(() => {
          window.location.reload();
        });
      }
    });


  }




}
