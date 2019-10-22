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
  jumptoInfo(index) {
    console.log('jumpto another page' + index);
    this.newMessage(index);

  }
  newMessage(index){
    const sendproductId = 'productId: ' + this.listproducts[index].productId;
    console.log(sendproductId);
    const sendIndex = ' Index: ' + index;
    const sendreferenceNo = 'referenceNo: ' +  this.referenceNo;
    const sendproductNumber = ' productNumber: ' +  this.countproducts[index];
    this.data.changeMessage(sendproductId + sendIndex + sendproductNumber + ' ' +  sendreferenceNo);
  }
}
