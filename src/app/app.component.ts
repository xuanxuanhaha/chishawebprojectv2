import { Component, OnInit } from '@angular/core';
import {Car} from './car';
import {CarService} from './car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'chishav1';
  cars: Car[];
  error = '';
  success = '';
  car = new Car('', 0);

  constructor(private carService: CarService) {
  }
  ngOnInit() {
    this.getCars();
  }
  getCars(): void{
    this.carService.getAll().subscribe(
      (res: Car[]) => {
        this.cars = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  addCar(f) {
    this.error = '';
    this.success = '';

    this.carService.store(this.car)
      .subscribe(
        (res: Car[]) => {
          // Update the list of cars
          this.cars = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          f.reset();
        },
        (err) => this.error = err
      );
  }

}
