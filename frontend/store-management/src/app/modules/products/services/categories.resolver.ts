import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProductService } from "./product.service";
import { Observable } from "rxjs";
import { Category } from "../models/category";

@Injectable({
    providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category>{
    constructor(private productService: ProductService) {

    }
    resolve() : any{
        console.log('resolver');
        return this.productService.fetchCategories();
    }
}