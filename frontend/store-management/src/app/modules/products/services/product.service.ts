import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';

import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService<Product> {

  constructor(http: HttpClient) {
    super(http, '/product');
  }
  public getCategories(): Observable<any>{
    return this.http.get(`${this.baseUrl}${this.apiUrl}/categories`);
  }
}
