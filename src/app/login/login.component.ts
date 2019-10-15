import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
}
