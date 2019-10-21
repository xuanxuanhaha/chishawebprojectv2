import {Component, HostListener, OnInit} from '@angular/core';
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
  countproducts = [];
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
    console.log(this.listproducts);
  }
  getProducts() {
    return this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        for(let i = 0; i < res.length; i++){
          this.listproducts[i] = res[i];
        }
        console.log(this.listproducts[0]);
      },
      (err) => {
        this.error = err;
      }
    );
  }

  addOne(index) {
    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 0;
      }
    }
    this.countproducts[index] = this.countproducts[index] + 1;
    console.log(this.countproducts);
    console.log(this.listproducts[index]);
  }
  deleteOne(index) {
    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 0;
      }
    }
    this.countproducts[index] = this.countproducts[index] - 1;
    if(this.countproducts[index] < 0){
      this.countproducts[index] = 0;
      alert('can not remove, this product is less than 0');
    }
    console.log(this.countproducts);
    console.log(this.listproducts[index]);
  }

}
