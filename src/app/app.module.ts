import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {CarService} from './car.service';
import { UserService} from './user.service';
import {ProductService} from './product.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent} from './signup/signup.component';
import { ProductShowComponent } from './product-show/product-show.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

import { CartComponent } from './cart/cart.component';
import { PayfromcartComponent } from './payfromcart/payfromcart.component';

import { StripepaymentComponent } from './stripepayment/stripepayment.component';
import { PaypalpaymentComponent } from './paypalpayment/paypalpayment.component';
import { InvoicefinishpayComponent } from './invoicefinishpay/invoicefinishpay.component';



const routes: Routes = [
  {path: 'app', component: AppComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProductShowComponent,
    UserinfoComponent,

    CartComponent,
    PayfromcartComponent,

    StripepaymentComponent,
    PaypalpaymentComponent,
    InvoicefinishpayComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CarService, UserService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
