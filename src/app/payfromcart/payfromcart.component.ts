import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Product} from '../product';
import {ProductService} from '../product.service';

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
  products: Product[];
  numberarray = [];
  itemnumberarray = [];
  itemnumberarray2 = [];
  itemIdShowarray = [];
  itemIdShowarray2 = [];
  constructor(private data: DataService, private productService: ProductService,) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.message);
    for (let i = 0; i < this.message.length; i += 2) {
      // const value = this.message[i].replace(/[^0-9]/ig,"");
      this.numberarray.push(this.message.slice(i, i + 2));
    }
    console.log(this.numberarray);

    for(let i = this.numberarray.length / 2; i < this.numberarray.length; i++){
      this.itemnumberarray.push(Number(this.numberarray[i].replace(/[^0-9]/ig,'')));
    }
    for(let i = 0; i < this.numberarray.length / 2; i++){
      this.itemIdShowarray.push(Number(this.numberarray[i].replace(/[^0-9]/ig,'')));
    }

    console.log(this.itemnumberarray);
    for(let i = 0; i < this.itemnumberarray.length; i++){
      this.itemnumberarray2[i] = this.itemnumberarray[i];
    }
    this.getProducts();

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


      },
      (err) => {
        this.error = err;
      }
    );
  }
  printtest(){
    this.getProducts();
    console.log(this.buyproduct);
  }
}
