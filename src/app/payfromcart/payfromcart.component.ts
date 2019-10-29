import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-payfromcart',
  templateUrl: './payfromcart.component.html',
  styleUrls: ['./payfromcart.component.css']
})
export class PayfromcartComponent implements OnInit {

  message: string;
  buyproduct = [];
  buyproduct2 = [];
  error: any;
  totalprice = 0;
  products: Product[];
  itemnumberarray = [];
  itemnumberarray2 = [];
  itemIdShowarray = [];
  referenceNo = '';
  firstname = new FormControl('');
  lastname = new FormControl('');
  email = new FormControl('');
  phone = new FormControl('');
  constructor(private data: DataService, private productService: ProductService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    const message2 = this.message.split(',');
    this.referenceNo = message2.slice(-1)[0];
    message2.pop();
    console.log(message2);

    for(let i = 0; i < message2.length / 2; i++){
      this.itemIdShowarray.push(Number(message2[i]));
    }
    for(let i = message2.length / 2; i < message2.length; i++){
      this.itemnumberarray.push(Number(message2[i]));
    }

    console.log(this.itemnumberarray);
    for(let i = 0; i < this.itemnumberarray.length; i++){
      this.itemnumberarray2[i] = this.itemnumberarray[i];
    }
    this.getProducts();

    this.data.currentMessage.subscribe(message => this.message = message);
  }

  getProducts() {
    return this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        for(let i = 0; i < this.products.length; i++){
          this.buyproduct[i] = this.products[i];
        }
        console.log(this.buyproduct);


        for(let i = 0; i < this.buyproduct.length; i++){
          console.log(Number(this.buyproduct[i].productId));
          console.log(this.itemIdShowarray[i]);

          for (let j = 0; j < this.itemIdShowarray.length; j++){
            if(Number(this.buyproduct[i].productId) === this.itemIdShowarray[j]){
              this.buyproduct2.push(this.buyproduct[i]);
            }
          }

        }
        console.log(this.buyproduct2);
        this.calculateTotal();

      },
      (err) => {
        this.error = err;
      }
    );

  }

  calculateTotal(){
    for(let i = 0; i < this.itemnumberarray2.length; i++){
      this.totalprice = this.totalprice + this.itemnumberarray2[i] * this.buyproduct2[i].unitPrice;
    }
    console.log(this.totalprice);
  }

  newMessage() {
    // let newmessage = this.totalprice.toString();
    let newmessage = this.totalprice.toString();
    for (let i = 0; i < this.buyproduct2.length; i++){
        newmessage = newmessage + ',' + this.buyproduct2[i].productId.toString();
    }
    for (let i = 0; i < this.buyproduct2.length; i++){
      newmessage = newmessage + ',' + this.itemnumberarray2[i];
    }
    newmessage = newmessage + ',' + this.referenceNo.toString();
    newmessage = newmessage + ',' + 'from cart';
    newmessage = newmessage + ',' + this.firstname.value;
    newmessage = newmessage + ',' + this.lastname.value;
    newmessage = newmessage + ',' + this.email.value;
    newmessage = newmessage + ',' + this.phone.value;
    console.log(newmessage);
    this.data.changeMessage(newmessage);

    // console.log(this.firstname.value);
    // console.log(this.lastname.value);
    // console.log(this.email.value);
    // console.log(this.phone.value);

    // this.personalinfoMessage();
  }

  // personalinfoMessage(){
  //   this.data.changeMessage('Hello from Sibling');
  // }
}
