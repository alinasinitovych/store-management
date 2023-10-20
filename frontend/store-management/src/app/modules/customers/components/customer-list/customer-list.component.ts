import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../models/customer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers$: Observable<any>  = this.customerService.getAll();
 
  public displayedColumns: string[] = ['Customer Name', 'Customer Address', 'Total Ordered Cost', 'Orders Count', 'Action'];
 
  dataSource: MatTableDataSource<any>;

  constructor(private customerService: CustomerService) {
    this.dataSource = new MatTableDataSource<Customer>();
    
  }
  public deleteCustomer(customer: Customer){
    console.log('a');
    this.customerService.delete(customer.id);
  }

}
