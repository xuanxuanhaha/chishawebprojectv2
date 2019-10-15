import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {Routes, RouterModule} from '@angular/router';
import {CarService} from './car.service';
import { UserService} from './user.service';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {path: 'app', component: AppComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CarService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
