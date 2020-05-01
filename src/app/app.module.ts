import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { CreateProductComponent } from './Components/create-product/create-product.component';
import { EditProductComponent } from './Components/edit-product/edit-product.component';
import { ProductsListComponent } from './Components/products-list/products-list.component';
import { ProductComponent } from './Components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ReactiveFormsModule } from '@angular/forms';


import { httpInterceptorProviders } from './http-interceptors';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import {ProductService} from './services/product.service';
import { ErrorComponent } from './Components/error/error.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component'

const routes: Routes = [

  { path: "admin/products", component: ProductsListComponent },
  { path: "admin/orders", component: OrderListComponent },
  { path: 'admin/create', component: CreateProductComponent },
  { path: 'admin/edit/:id', component: EditProductComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    EditProductComponent,
    ProductComponent,
    ProductsListComponent,
    OrderComponent,
    OrderListComponent,
    ErrorComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    OrderService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
