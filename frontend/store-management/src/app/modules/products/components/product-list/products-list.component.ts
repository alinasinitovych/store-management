import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, take } from 'rxjs';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { PopUpDeleteComponent } from 'src/app/modules/shared/pop-up-delete/pop-up-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css', '../../../shared/shared.style.css']
})
export class ProductsListComponent implements OnInit {
  products$: Observable<any> = this.productService.getAll();
  public displayedColumns: string[] = ['id', 'name', 'category', 'availableQuantity', 'price', 'action'];
  dataSource: MatTableDataSource<any>;
  constructor(private productService: ProductService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }
  ngOnInit(): void {

  }
  deleteProducts(id: number) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      panelClass: 'custom-modalbox'
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id).pipe(take(1)).subscribe(() => {
          window.location.reload();
        });
      }
    });


  }
}

