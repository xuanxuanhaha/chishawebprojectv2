import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ProductShowComponent} from './product-show/product-show.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {CartComponent} from './cart/cart.component';
import {PayfromcartComponent} from './payfromcart/payfromcart.component';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Signup', component: SignupComponent},
  {path: 'ProductShow', component: ProductShowComponent},
  {path: 'UserInfo', component: UserinfoComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Payfromcart', component: PayfromcartComponent}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
