import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {ProductShowComponent} from './product-show/product-show.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {StripepaymentComponent} from './stripepayment/stripepayment.component';
import {PaypalpaymentComponent} from "./paypalpayment/paypalpayment.component";

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Signup', component: SignupComponent},
  {path: 'ProductShow', component: ProductShowComponent},
  {path: 'UserInfo', component: UserinfoComponent},
  {path: 'stripepayment', component: StripepaymentComponent},
  {path: 'paypalpayment', component: PaypalpaymentComponent},

]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
