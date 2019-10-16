import { Component, OnInit } from '@angular/core';
import { Product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})
export class ProductShowComponent implements OnInit {
  products: Product[];
  error = '';
  success = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
