
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/modules/products/models/product';
import { ProductService } from 'src/app/modules/products/services/product.service';
import { SharedOrderService } from '../../services/shared-order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/modules/products/models/category';



@Component({
  selector: 'app-add-product-to-order',
  templateUrl: './add-product-to-order.component.html',
  styleUrls: ['./add-product-to-order.component.css', '../../../shared/shared.style.css']
})
export class AddProductToOrderComponent implements OnInit {
  private allProducts: Product[] = [];
  private selectedCategoryId: number | null = null;
  private categoryName: string = ''

  public availableQuantity: number = 0;
  public products$ = this.productService.getAll();
  categories:Category[] =[];
  private selectedProduct: Product | undefined;

  public orderItemForm: FormGroup = this.formBuilder.group({
    id: 0,
    productId: 0,
    orderId: this.sharedService.currentOrder.id,
    productName: ['', Validators.required],
    productCategory: ['', Validators.required],
    price: 0,
    quantity: 1,
    productSize: 0
  })

  constructor(
    private productService: ProductService,
    private sharedService: SharedOrderService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.productService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
    this.productService.getAll().subscribe((products) => {
      this.allProducts = products;
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
      this.categoryName = this.selectedProduct.categoryName;
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
    if (this.orderItemForm.valid) {
      this.orderItemForm.patchValue({ productCategory: this.categoryName })
      this.sharedService.currentOrder.orderItems.push(this.orderItemForm.getRawValue());

      if (this.sharedService.isEditing) {
        this.sharedService.newOrderItems.push(this.orderItemForm.getRawValue())
        this.router.navigate(['/orders/edit', this.sharedService.currentOrder.id]);
      } else {
        this.router.navigate(['/orders/create']);

      }
    }
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
}