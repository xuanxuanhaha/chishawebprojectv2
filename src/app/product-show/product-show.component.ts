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
  message = 'hola Mundo!';
  addtocartproducts = [];
  addtocartproductId = [];
  addtocartIndex = [];
  addtocartreferenceNo = [];
  addtocartproductNumber = [];

  constructor(private productService: ProductService, private data: DataService) { }

  ngOnInit() {
    this.getProducts();
    console.log(this.listproducts);
    this.numbershow = false;
    this.getReferenceNo();
    this.data.currentMessage.subscribe(message => this.message = message);
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
    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 1;
      }
    }
    this.countproducts[index] = this.countproducts[index] + 1;
    console.log(this.countproducts);
    console.log(this.listproducts[index]);
  }
  deleteOne(index) {
    this.numbershow = true;
    for(let i = 0; i < this.listproducts.length; i++){
      if(!this.countproducts[i]){
        this.countproducts[i] = 1;
      }
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
        if(index === indexvalue){
          cartexistornot = 1;
        }
      }
      if(cartexistornot === 0){
        this.addtocartproductId.push(cartproductId);
        this.addtocartIndex.push(cartIndex);
        this.addtocartreferenceNo.push(cartreferenceNo);
        this.addtocartproductNumber.push(cartproductNumber);
      }else{
        this.addtocartproductId[index] = cartproductId;
        this.addtocartIndex[index] = cartIndex;
        this.addtocartreferenceNo[index] = cartreferenceNo;
        this.addtocartproductNumber[index] = cartproductNumber;

      }
    }
    console.log(this.addtocartproductId, this.addtocartIndex, this.addtocartreferenceNo, this.addtocartproductNumber);
  }
}

