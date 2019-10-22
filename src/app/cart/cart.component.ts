import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  message: string;
  listproducts = [];
  products: Product[];
  error = '';
  success = '';
  numberarray = [];
  itemnumber = [];
  referenceNo: any;
  countproducts = [];
  numbershow: boolean;
  addtocartproductId = [];
  addtocartIndex = [];
  addtocartreferenceNo = [];
  addtocartproductNumber = [];
  constructor(private data: DataService, private productService: ProductService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    const result = [];

    for (let i = 0; i < this.message.length; i++){
      const value = this.message[i].replace(/[^0-9]/ig, '');
      result.push(value);
    }
    for (let i = 0; i < result.length; i += 4) {
      // const value = this.message[i].replace(/[^0-9]/ig,"");
      this.numberarray.push(result.slice(i, i + 4));
    }
    console.log(this.numberarray);
    console.log(this.numberarray.length);
    this.getProducts();
    for( let i = 0; i < this.numberarray.length; i++){
      console.log(this.numberarray[i]);
      this.itemnumber.push(this.numberarray[i][3]);
    }
  }

  getProducts() {
    return this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        // for(let i = 0; i < res.length; i++){
        //   this.listproducts[i] = res[i];
        // }
        for(let i = 0; i < this.numberarray.length; i++){
          console.log(this.numberarray[i][1]);
          this.listproducts[i] = res[Number(this.numberarray[i][1])];
        }
        console.log(this.listproducts);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  addOne(index) {
    this.numbershow = true;
    this.itemnumber[index] = Number(this.itemnumber[index]) + 1;
    console.log(Number(this.itemnumber[index]));

    this.numberarray[index][3] = Number(this.itemnumber[index]);
    console.log(this.numberarray[index]);
  }
  deleteOne(index) {
    this.numbershow = true;
    this.itemnumber[index] = Number(this.itemnumber[index]) - 1;
    this.numberarray[index][3] = Number(this.itemnumber[index]);
    if(this.itemnumber[index] < 1 ){
      // this.itemnumber[index] = Number(this.itemnumber[index]) + 1;
      // this.numberarray.splice(index - 1, index);
      this.listproducts.splice(index, index + 1);
    }

    console.log(Number(this.itemnumber[index]));
    console.log(this.numberarray[index]);
  }


}
