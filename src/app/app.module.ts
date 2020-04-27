import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router'
import { createComponent } from '@angular/compiler/src/core';

import { CreateProductComponent } from './Components/create-product/create-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductComponent } from './Components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderListComponent } from './components/order-list/order-list.component';

const routes: Routes = [

  { path: "admin/products", component: ProductsListComponent },
  { path: "admin/orders", component: OrderListComponent },
  { path: 'admin/create', component: CreateProductComponent },
  { path: 'admin/edit', component: EditProductComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    EditProductComponent,
    ProductComponent,
    ProductsListComponent,
    OrderComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
