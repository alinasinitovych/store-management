import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsListComponent } from "./components/product-list/products-list.component";
import { ProductFormComponent } from "./components/product-form/product-form.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";

const routes: Routes = [
    { path: '', component: ProductsListComponent },
    { path: 'create', component: ProductFormComponent },
    { path: 'details/:id', component: ProductDetailsComponent },
    { path: 'edit/:id', component: ProductFormComponent },


]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProductsRoutingModule { }