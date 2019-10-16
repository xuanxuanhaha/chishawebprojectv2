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
  listproducts = [];
  productsArray = {
    productId: 0,
    productName: '',
    unitPrice: 0,
    unit: '',
    imgUrl: '',
    categoryId: 0,
    supplierId: 0
  };
  error = '';
  success = '';

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
    console.log(this.productsArray);
  }
  getProducts(): void {
    this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        for(let i = 0; i < res.length; i++){
          this.listproducts[i] = res[i];
        }
        console.log(this.productsArray[0]);
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
