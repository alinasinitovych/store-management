import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';

import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends GenericService<Customer> {

  constructor(http: HttpClient) {
    super(http, '/Customer');
  }
}
