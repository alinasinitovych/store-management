import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, take } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { PopUpDeleteComponent } from 'src/app/modules/shared/components/pop-up-delete/pop-up-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ThisReceiver } from '@angular/compiler';
import { Category } from '../../models/category';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<any> = this.productService.getAll();
  products: Product[] = []
  public displayedColumns: string[] = ['id', 'name', 'category', 'availableQuantity', 'price', 'action'];
  dataSource: MatTableDataSource<any>;
  categories: Category[] =[];
  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private toastr: ToastrService) {
    this.dataSource = new MatTableDataSource<Product>();
  }
  ngOnInit(): void {
    this.getProducts()
    this.productService.categories$.subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }
  deleteProducts(id: number) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id).pipe(take(1)).subscribe(() => {

          this.showSuccess();
          this.getProducts();
        });
      }
    });

  }
  private showSuccess() {
    this.toastr.success('Product was successfully deleted!');
  }
  private getProducts() {
    this.productService.getAll().pipe(take(1)).subscribe((products) => {
      this.products = products;
    })
  }
}

