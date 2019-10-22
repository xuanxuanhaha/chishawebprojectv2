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

  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  totalprice = 0;

  constructor(private data: DataService, private productService: ProductService) {

    // this.checklist = [
    //   {id: 1, value: 'Elenor Anderson', isSelected: false},
    //   {id: 2, value: 'Caden Kunze', isSelected: true},
    //   {id: 3, value: 'Ms. Hortense Zulauf', isSelected: true},
    //   {id: 4, value: 'Grady Reichert', isSelected: false},
    //   {id: 5, value: 'Dejon Olson', isSelected: false},
    //   {id: 6, value: 'Jamir Pfannerstill', isSelected: false},
    //   {id: 7, value: 'Aracely Renner DVM', isSelected: false},
    //   {id: 8, value: 'Genoveva Luettgen', isSelected: false}
    // ];
    this.getCheckedItemList();

  }

  ngOnInit() {
    this.masterSelected = false;
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
          this.listproducts[i].isSelected = false;
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

  checkUncheckAll() {
    console.log('check uncheck all');
    for (var i = 0; i < this.listproducts.length; i++) {
      this.listproducts[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    console.log('it all selected');
    this.masterSelected = this.listproducts.every(function(item:any) {
      return item.isSelected === true;
    });
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    console.log('getCheckedItemList');
    this.checkedList = [];
    this.totalprice = 0;
    for (var i = 0; i < this.listproducts.length; i++) {
      if(this.listproducts[i].isSelected){
        this.checkedList.push(this.listproducts[i]);
        this.totalprice = this.totalprice + this.listproducts[i].unitPrice * this.itemnumber[i];
      }
    }
    this.checkedList = JSON.stringify(this.checkedList);
  }


}
