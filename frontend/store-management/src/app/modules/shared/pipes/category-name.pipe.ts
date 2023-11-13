import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../products/models/category';
import { ProductService } from '../../products/services/product.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {
  
  constructor(private productService: ProductService) {  
  }

  transform(categoryId: number | undefined, categories: Category[]): Observable<any> {
    return this.productService.categories$.pipe(
      map((categories: Category[]) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : 'NA';
      })
    );
  }
  

}
