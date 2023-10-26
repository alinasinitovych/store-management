import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../../shared/shared.style.css']
})
export class ProductFormComponent {


  categories$ = this.productService.getCategories();
  productForm: FormGroup = this.formBuilder.group({
    id: 0,
    name: [''],
    availableQuantity: 0,
    price: 0,
    description: [''],
    categoryId: 0,
    categoryName: [''],
    createdDate: new Date()
  })
  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) {
  }

  submitForm() {
    this.productService.create(this.productForm.getRawValue()).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/products']);
    })
    console.log(this.productForm.value)
  }

}
