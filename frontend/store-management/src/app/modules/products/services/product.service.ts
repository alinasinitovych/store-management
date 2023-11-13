import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/services/generic.service';

import { Product } from '../models/product';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../models/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends GenericService<Product>  {
  private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public categories$: Observable<Category[]> = this.categoriesSubject.asObservable();
  
  constructor(http: HttpClient) {
    super(http, '/product');
  }
  
  fetchCategories() {
    return this.http.get<Category[]>(`${this.baseUrl}${this.apiUrl}/categories`).pipe(tap(
      (categories: Category[]) => {
        this.categoriesSubject.next(categories);
      }
    ));
    }
  }

  

