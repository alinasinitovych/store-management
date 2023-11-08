import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../models/customer';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopUpDeleteComponent } from 'src/app/modules/shared/pop-up-delete/pop-up-delete.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = []
  displayedColumns: string[] = ['Customer Name', 'Customer Address', 'Total Ordered Cost', 'Orders Count', 'Action'];

  dataSource: MatTableDataSource<any>;

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Customer>();

  }
  ngOnInit() {
    this.loadCustomers();
  }
  public deleteCustomer(customer: Customer) {

    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe((result) => {
      if (result) {
        this.customerService.delete(customer.id).pipe(take(1)).subscribe(() => {
          this.showSuccess();
          this.loadCustomers();
        });
      }
    });
  }
  private loadCustomers() {
    this.customerService.getAll().pipe(take(1)).subscribe((customers) => {
      this.customers = customers;
    })
  }

  private showSuccess() {
    this.toastr.success('Customer was successfully deleted!');
  }
 

}
