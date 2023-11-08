import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { take } from 'rxjs';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css', '../../../shared/shared.style.css']
})
export class ProductFormComponent implements OnInit{

  private editing = false;
  
  headerText: string = 'Create Product';
  categories : Category[] =[]
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
  constructor(
    private productService: ProductService, 
    private router: Router, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.productService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    
    const productId = this.route.snapshot.params['id'];
    if(productId){
      this.headerText = 'Edit Product';
      this.editing = true;
      this.productService.getById(productId).pipe(take(1)).subscribe((product) => {
        this.productForm.patchValue(product);
      })
    }
  }

  submitForm() {
    if(this.editing){
      this.productService.update(this.productForm.getRawValue(), this.productForm.value.id).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/products']);
      })
    }
    else{
      this.productService.create(this.productForm.getRawValue()).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/products']);
      })
    }
   
    console.log(this.productForm.value)
  }

}
