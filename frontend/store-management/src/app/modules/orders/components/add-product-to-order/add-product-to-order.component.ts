import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/modules/products/models/product';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedService } from '../../services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.css']
})
export class AddProductToOrderComponent implements OnInit {
  constructor(private productService: ProductService, private sharedService: SharedService, private formBuilder: FormBuilder, private router: Router) {
  }
  availableQuantity: number = 0;
  products$ = this.productService.getAll();
  allProducts: Product[] = [];
  categories$ = this.productService.getCategories();
  selectedCategoryId: number | null = null;

  orderItemForm: FormGroup = this.formBuilder.group({
    id: 0,
    productId: 0,
    productName: [''],
    productCategory: [''],
    price: 0,
    quantity: 1,
    size: 0
  })
  categoryChosen: boolean = false;
  selectedCategoryName: string | null = null;

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.allProducts = products;
    });

    this.subscribeToFormChanges();
  }
 

  onCategoryChange(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    if (this.selectedCategoryId) {
      this.products$ = this.filterProductsByCategory(this.selectedCategoryId);
    } else {
      this.products$ = this.productService.getAll();
    }
  }

  filterProductsByCategory(categoryId: number): Observable<Product[]> {
    const filteredProducts = this.allProducts.filter((product) => product.categoryId === categoryId);
    return new Observable<Product[]>((observer) => {
      observer.next(filteredProducts);
    });
  }

  submitForm() {
    if (this.orderItemForm.valid) {
      this.sharedService.currentOrder.orderItems.push(this.orderItemForm.getRawValue());
      this.router.navigate(['/createorder']);
    }

  }
  private subscribeToFormChanges() {
    this.orderItemForm.get('productId')?.valueChanges.subscribe((productId) => {
      this.updatePriceBasedOnProduct(productId, this.orderItemForm.get('quantity')?.value);
      const selectedProduct = this.allProducts.find(product => product.id === productId);
      if (selectedProduct) {
        this.availableQuantity = selectedProduct.availableQuantity;
        this.orderItemForm.patchValue({ productName: selectedProduct.name });
        this.orderItemForm.patchValue({ price: selectedProduct.price * this.orderItemForm.value.quantity })

      } else {
        this.availableQuantity = 0;
        this.orderItemForm.patchValue({ productName: '' });
      }
    });

    this.orderItemForm.get('quantity')?.valueChanges.subscribe((quantity) => {
      const productId = this.orderItemForm.get('productId')?.value;
      this.updatePriceBasedOnProduct(productId, quantity);
    });
  }

  private updatePriceBasedOnProduct(productId: number | null, quantity: number) {
    const selectedProduct = this.allProducts.find((product) => product.id === productId);
    if (selectedProduct) {
      const price = selectedProduct.price * quantity;
      this.orderItemForm.get('price')?.setValue(price);
    }
  }

}
