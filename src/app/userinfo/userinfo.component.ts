import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ProductService} from '../product.service';
import {Product} from '../product';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  message: string;
  error = '';
  products: Product[];
  buyproduct: any;
  success = '';
  productId = 0;
  index = 0;
  productNumber = 0;
  referenceNo = '';
  totalprice = 0;
  constructor(private productService: ProductService, private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    const messageArray = this.message.split(' ');
    console.log(messageArray);
    this.productId = Number(messageArray[1]);
    this.index = Number(messageArray[3]);
    this.productNumber = Number(messageArray[5]);
    this.referenceNo = messageArray[7];
    console.log(this.productNumber, this.productId, this.index, this.referenceNo);
    this.getProducts(this.index);
    // this.totalprice = this.productNumber * this.buyproduct.unitPrice;
  }

  getProducts(index) {
    return this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        this.buyproduct = res[index];
        this.totalprice = this.buyproduct.unitPrice * this.productNumber;
      },
      (err) => {
        this.error = err;
      }
    );
  }

}
