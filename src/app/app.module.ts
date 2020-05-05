import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service'
import { AuthService } from './services/auth.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { ProductService } from './services/product.service';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component'
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { UserOrdersComponent } from './components/profile/user-orders/user-orders.component';
import { UserInfoComponent } from './components/profile/user-info/user-info.component'
import { JwtModule } from "@auth0/angular-jwt";
import { ArrivalCarouselComponent } from './Components/arrival-carousel/arrival-carousel.component';
import { UploadComponent } from './components/upload/upload.component';

const routes: Routes = [

  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "about", component: AboutComponent },
  { path: "cart", component: CartComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "admin/products/:id", component: ProductsListComponent },
  { path: "admin/orders", component: OrderListComponent },
  { path: 'admin/create', component: CreateProductComponent },
  { path: 'admin/edit/:id', component: EditProductComponent },
  { path: '**', component: ErrorComponent },
]

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


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
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    AboutComponent,
  //  EditProfileComponent,
    FooterComponent,
    CartItemComponent,
    UserOrdersComponent,
    UserInfoComponent,
    ArrivalCarouselComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["example.com"],
        blacklistedRoutes: ["example.com/examplebadroute/"]
      }
    })
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    OrderService,
    ProductService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
