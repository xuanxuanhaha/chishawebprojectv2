import { Component, OnInit } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModel} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import {AppComponent} from '../app.component';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User(0, '', '', '', '', 0, '', '');
  title = 'chishav1';
  users: User[];
  error = '';
  success = '';
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addUser(f) {
    this.error = '';
    this.success = '';

    this.userService.store(this.user)
      .subscribe(
        (res: User[]) => {
          // Update the list of cars
          this.users = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

}
