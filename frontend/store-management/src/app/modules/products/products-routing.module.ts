import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "./components/product-list/products-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";

const routes: Routes = [
    { path: '', component: ProductsListComponent },
    { path: 'products/createproduct', component: ProductFormComponent },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }