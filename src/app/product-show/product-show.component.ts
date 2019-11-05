import {Component, HostListener, OnInit} from '@angular/core';
import { Product} from '../product';
import {ProductService} from '../product.service';
import {DataService} from '../data.service';

@Component({
  selector: 'app-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.css']
})

export class ProductShowComponent implements OnInit {
  products: Product[];
  referenceNo: any;
  listproducts = [];
  countproducts = [];
  numbershow: boolean;
  error = '';
  success = '';
  message = 'hola Mundo!';
  addtocartproductId = [];
  addtocartIndex = [];
  addtocartreferenceNo = [];
  addtocartproductNumber = [];
  numberarray = [];
  itemnumber = [];
  idsfromcart = [];
  nosfromcart = [];
  firsttimefromcart: boolean;
  totalproductNo: number;
  constructor(private productService: ProductService, private data: DataService) {

  }

  ngOnInit() {
    this.getProducts();
    console.log(this.listproducts);
    this.numbershow = false;
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);

    if(this.message !== 'default message'){
      this.numbershow = true;
      console.log(this.message);
      this.totalproductNo = Number(this.message[Number(this.message.length - 1)]);
      console.log(this.totalproductNo);

      const result = [];

      for (let i = 0; i < this.message.length - 1; i++) {
        const value = this.message[i].replace(/[^0-9]/ig, '');
        result.push(value);
      }
      for (let i = 0; i < result.length; i += 4) {
        // const value = this.message[i].replace(/[^0-9]/ig,"");
        this.numberarray.push(result.slice(i, i + 4));
      }
      console.log(this.numberarray);
      console.log(this.numberarray.length);
      for( let i = 0; i < this.numberarray.length; i++){
        console.log(this.numberarray[i]);
        this.itemnumber.push(this.numberarray[i][3]);
        this.idsfromcart.push(this.numberarray[i][0]);
        this.nosfromcart.push(this.numberarray[i][3]);
        this.referenceNo = this.numberarray[0][2];
      }
      this.firsttimefromcart = true;

      console.log(this.countproducts);
      for(let i = 0; i < this.totalproductNo; i++){
        if(!this.countproducts[i]){
          this.countproducts[i] = 1;
          console.log('No');
        }
        console.log(this.countproducts);
        if(this.firsttimefromcart === true){

          for (let j = 0; j < this.totalproductNo; j++){
            if(Number(this.idsfromcart[j]) - 1 === i){
              console.log('Yes');
              this.countproducts[i] = Number(this.nosfromcart[j]);
            }
          }
        }
        console.log(this.countproducts);
      }

    }else{
      this.getReferenceNo();
      this.firsttimefromcart = false;
    }

    console.log(this.idsfromcart);
    console.log(this.nosfromcart);

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
  getReferenceNo(){
    if (!this.referenceNo){
      this.referenceNo = Math.floor(Math.random() * 100000000);
    }
    console.log(this.referenceNo);
  }

  addOne(index) {
    this.numbershow = true;
    if(this.numberarray.length>0){
      console.log(this.numberarray[0][0]);
    }

    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 1;
        console.log('No');
      }
      console.log(this.countproducts);
      if(this.firsttimefromcart === true){

        for (let j = 0; j < this.listproducts.length; j++){
          if(Number(this.idsfromcart[j]) - 1 === i){
            console.log('Yes');
            this.countproducts[i] = Number(this.nosfromcart[j]);
          }
        }
      }
      console.log(this.countproducts);
    }
    console.log(this.countproducts);
    this.countproducts[index] = this.countproducts[index] + 1;
    console.log(this.countproducts);
    console.log(this.listproducts[index]);
    this.firsttimefromcart = false;
  }
  deleteOne(index) {
    this.numbershow = true;
    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 1;
      }

      console.log(this.countproducts);
      if(this.firsttimefromcart === true){

        for (let j = 0; j < this.listproducts.length; j++){
          if(Number(this.idsfromcart[j]) - 1 === i){
            console.log('Yes');
            this.countproducts[i] = Number(this.nosfromcart[j]);
          }
        }
      }
      console.log(this.countproducts);
    }
    this.countproducts[index] = this.countproducts[index] - 1;
    if(this.countproducts[index] < 1){
      this.countproducts[index] = 1;
      alert('can not remove, this product is less than 1');
    }
    console.log(this.countproducts);
    console.log(this.listproducts[index]);
  }
  // buy one product directly
  jumptoInfo(index) {
    console.log('jumpto another page' + index);
    this.newMessage(index);
  }
  newMessage(index){
    const sendproductId = 'productId: ' + this.listproducts[index].productId;
    console.log(sendproductId);
    const sendIndex = ' Index: ' + index;
    const sendreferenceNo = 'referenceNo: ' +  this.referenceNo;
    if(!this.numbershow){
      this.countproducts[index] = 1;
    }
    const sendproductNumber = ' productNumber: ' +  this.countproducts[index];

    this.data.changeMessage(sendproductId + sendIndex + sendproductNumber + ' ' +  sendreferenceNo);
  }
  // add to cart
  jumptoCart(index){
    console.log(index);
    console.log(this.countproducts[index]);
    this.addnewproducttocart(index);
    this.newMessage1();
  }
  addnewproducttocart(index){
    const cartproductId = 'productId: ' + this.listproducts[index].productId;
    const cartIndex = ' Index: ' + index;
    const cartreferenceNo = ' referenceNo: ' +  this.referenceNo;
    if(!this.numbershow){
      this.countproducts[index] = 1;
    }
    const cartproductNumber = ' productNumber: ' +  this.countproducts[index];
    console.log(cartIndex, cartproductId, cartreferenceNo, cartproductNumber);
    let cartexistornot = 0;
    let numberofexist = 0;


    if(this.addtocartproductId.length < 0 || this.addtocartproductId.length === 0){
      // this.addtocartproducts.push((cartproductId + cartIndex + cartreferenceNo + cartproductNumber).toString());
      this.addtocartproductId.push(cartproductId);
      this.addtocartIndex.push(cartIndex);
      this.addtocartreferenceNo.push(cartreferenceNo);
      this.addtocartproductNumber.push(cartproductNumber);
    }else{
      for (let i = 0; i < this.addtocartproductId.length; i++){


        const indexvalue = Number(this.addtocartIndex[i].replace(/[^0-9]/ig, ''));
        console.log(index, indexvalue);
        console.log(index === indexvalue);
        if(index === indexvalue){
          cartexistornot = 1;
          numberofexist = i;
        }
      }
      if(cartexistornot === 0){
        this.addtocartproductId.push(cartproductId);
        this.addtocartIndex.push(cartIndex);
        this.addtocartreferenceNo.push(cartreferenceNo);
        this.addtocartproductNumber.push(cartproductNumber);
      }else{
        console.log(numberofexist);
        this.addtocartproductNumber[numberofexist] = cartproductNumber;

      }
    }
    console.log(this.addtocartproductId, this.addtocartIndex, this.addtocartreferenceNo, this.addtocartproductNumber);
  }
  newMessage1(){
    const a = [];
    for(let i = 0; i < this.addtocartproductNumber.length; i++){
      a.push(this.addtocartproductId[i]);
      a.push(this.addtocartIndex[i]);
      a.push(this.addtocartreferenceNo[i]);
      a.push(this.addtocartproductNumber[i]);
    }
    a.push(this.listproducts.length);
    console.log(a);
    this.data.changeMessage1(a);
  }
}

