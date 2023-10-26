import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/products/models/product';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedOrderService } from '../../services/shared-order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.css', '../../../shared/shared.style.css']
})
export class AddProductToOrderComponent implements OnInit {
  private allProducts: Product[] = [];
  private selectedCategoryId: number | null = null;
  public availableQuantity: number = 0;
  public products$ = this.productService.getAll();
  public categories$ = this.productService.getCategories();
  private selectedProduct: Product | undefined;

  public orderItemForm: FormGroup = this.formBuilder.group({
    id: 0,
    productId: 0,
    productName: ['', Validators.required],
    productCategory: ['', Validators.required],
    price: 0,
    quantity: 1,
    productSize: 0
  })

  constructor(private productService: ProductService, private sharedService: SharedOrderService, private formBuilder: FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.allProducts = products;
    });

  }

  private checkIfOrderItemAlreadyAdded(): boolean {
    const isDuplicate = this.sharedService.currentOrder.orderItems.some((item) => {
      return item.productId === this.orderItemForm.value.productId;
    }
    );
    return false;
  }
  private updatePriceBasedOnProduct(product: Product, quantity: number) {
    const totalOrderItemPrice = product.price * quantity;
    this.orderItemForm.patchValue({ price: totalOrderItemPrice });
  }

  private filterProductsByCategory(categoryId: number): Observable<Product[]> {
    const filteredProducts = this.allProducts.filter((product) => product.categoryId === categoryId);
    return new Observable<Product[]>((observer) => {
      observer.next(filteredProducts);
    });
  }

  public onCategoryChange(categoryId: number | null) {
    this.selectedCategoryId = categoryId;

    if (this.selectedCategoryId) {
      this.products$ = this.filterProductsByCategory(this.selectedCategoryId);
    } else {
      this.products$ = this.productService.getAll();
    }
  }

  public onProductChange(productId: number) {
    this.selectedProduct = this.allProducts.find(product => product.id === productId);
    if (this.selectedProduct) {
      this.updatePriceBasedOnProduct(this.selectedProduct, this.orderItemForm.value.quantity);
      this.availableQuantity = this.selectedProduct.availableQuantity;
      this.orderItemForm.patchValue({ productName: this.selectedProduct.name });
    } else {
      this.availableQuantity = 0;
      this.orderItemForm.patchValue({ productName: '' });
    }
  }
  public onQuantityChange(quantity: number) {
    if (this.selectedProduct) {
      this.updatePriceBasedOnProduct(this.selectedProduct, quantity);
    }
  }

  public submitForm() {
    if (this.orderItemForm.valid && !this.checkIfOrderItemAlreadyAdded()) {
      this.orderItemForm.patchValue({ productCategory: 'aa' })
      this.sharedService.currentOrder.orderItems.push(this.orderItemForm.getRawValue());
      this.router.navigate(['/orders/createorder']);
    } else if (this.checkIfOrderItemAlreadyAdded()) {
      const orderItemIndex = this.sharedService.currentOrder.orderItems.findIndex(
        (item) => item.id === this.orderItemForm.value.productId
      );
      this.sharedService.currentOrder.orderItems[orderItemIndex].quantity += this.orderItemForm.value.quantity;
    }

  }



}
