import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {Customerinfo} from '../customerinfo';
import {CustomerinfoService} from '../customerinfo.service';
import {Product} from '../product';
import {ProductService} from '../product.service';

@Component({
  selector: 'app-invoicefinishpay',
  templateUrl: './invoicefinishpay.component.html',
  styleUrls: ['./invoicefinishpay.component.css']
})
export class InvoicefinishpayComponent implements OnInit {
  message: string;
  refIDNofrompaypal = '';
  referenceNo = '';
  totalAmount = 0;
  products: Product[];
  // how many product Number it have
  productNo = [];
  listproducts = [];
  // Product Id in database
  productId = [];
  firstname = '';
  lastname = '';
  email = '';
  phone = '';
  customerinfos: Customerinfo[];
  error='';
  success='';
  customerinfo = new Customerinfo('', '', '', '', '');
  constructor(private customerinfoService: CustomerinfoService, private data: DataService, private router: Router, private productService: ProductService) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.router.url);
    // /invoicefinishpay/5.5,1,3,3,1,33451960,from%20cart,ww,kk,aaaa,04122222222
    const urlmessage = this.router.url;
    this.refIDNofrompaypal = urlmessage.split('/').splice(-1)[0];
    console.log(this.refIDNofrompaypal);
    let refIDNofrompaypalArray = [];
    refIDNofrompaypalArray = this.refIDNofrompaypal.split(',');
    console.log(refIDNofrompaypalArray);

    this.totalAmount = refIDNofrompaypalArray[0];
    console.log(this.totalAmount);
    refIDNofrompaypalArray.shift();

    console.log(refIDNofrompaypalArray);

    this.phone = refIDNofrompaypalArray[refIDNofrompaypalArray.length - 1];
    console.log(this.phone);
    refIDNofrompaypalArray.pop();
    this.email = refIDNofrompaypalArray[refIDNofrompaypalArray.length-1];
    refIDNofrompaypalArray.pop();
    this.lastname = refIDNofrompaypalArray[refIDNofrompaypalArray.length-1];
    refIDNofrompaypalArray.pop();
    this.firstname = refIDNofrompaypalArray[refIDNofrompaypalArray.length-1];
    refIDNofrompaypalArray.pop();


    let fromCart = '';
    fromCart = refIDNofrompaypalArray[-1];
    refIDNofrompaypalArray.pop();
    this.referenceNo = refIDNofrompaypalArray.splice(-1)[0];
    console.log(this.referenceNo);

    console.log(refIDNofrompaypalArray);
    for(let i = refIDNofrompaypalArray.length / 2; i < refIDNofrompaypalArray.length; i++){
      this.productNo.push(refIDNofrompaypalArray[i]);
    }
    for (let i = 0; i < refIDNofrompaypalArray.length / 2; i++){
      this.productId.push(refIDNofrompaypalArray[i]);
    }
    //
    console.log(this.productNo);
    console.log(this.productId);

    this.getCustomerinfos();
    this.addCustomerinfo();
    this.getProducts();

  }
  getCustomerinfos(){
    this.customerinfoService.getAll().subscribe(
      (res: Customerinfo[]) => {
        this.customerinfos = res;
      },
      (err) => {
        this.error = err;
      }
    );

  }

  addCustomerinfo() {
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.email);
    console.log(this.phone);
    this.error = '';
    this.success = '';
    this.customerinfoService.store({firstname: this.firstname, lastname: this.lastname, email: this.email, phone: this.phone, referenceNo: this.referenceNo})
      .subscribe(
        (res: Customerinfo[]) => {
          // Update the list of cars
          this.customerinfos = res;

          // Inform the user
          this.success = 'Created successfully';

          // Reset the form
          // f.reset();
        },
        (err) => this.error = err
      );
  }
  getProducts() {
    return this.productService.getAll().subscribe(
      (res: Product[]) => {
        this.products = res;
        // for(let i = 0; i < res.length; i++){
        //   this.listproducts[i] = res[i];
        // }
        for(let i = 0; i < this.productId.length; i++){
          console.log(this.productId[i]);
          this.listproducts[i] = res[Number(this.productId[i])-1];
          console.log(res[Number(this.productId[i])-1]);
        }
        console.log(this.listproducts);
      },
      (err) => {
        this.error = err;
      }
    );
  }
}
