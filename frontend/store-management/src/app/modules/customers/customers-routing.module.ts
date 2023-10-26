import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerListComponent } from "./components/customer-list/customer-list.component";
import { CustomerFormComponent } from "./components/customer-form/customer-form.component";
const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'customers', component: CustomerListComponent },
    { path: 'customers/createcustomer', component: CustomerFormComponent },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomersRoutingModule { }