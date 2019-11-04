import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {Customerinfo} from '../customerinfo';
import {CustomerinfoService} from '../customerinfo.service';
import {Product} from '../product';
import {ProductService} from '../product.service';
import {Paymentinfo} from '../paymentinfo';
import {PaymentinfoService} from '../paymentinfo.service';

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
  paymentId = '';
  paymentStatus = '';
  paymentCreateTime = '';
  paymentinfo = new Paymentinfo('', '', '', '');
  paymentinfos: Paymentinfo[];
  constructor(private customerinfoService: CustomerinfoService, private data: DataService, private router: Router, private productService: ProductService, private paymentinfoService: PaymentinfoService) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.router.url);
    // /invoicefinishpay/5.5,1,3,3,1,33451960,from%20cart,ww,kk,aaaa,04122222222
    const urlmessage = this.router.url;
    this.refIDNofrompaypal = urlmessage.split('/').splice(-1)[0];
    console.log(this.refIDNofrompaypal);
    let paypalinfoArray = [];
    paypalinfoArray = this.refIDNofrompaypal.split(',');

    this.referenceNo = paypalinfoArray[0];
    this.paymentId = paypalinfoArray[1];
    this.paymentStatus = paypalinfoArray[2];
    this.paymentCreateTime = paypalinfoArray[3];
    //
    // this.getCustomerinfos();
    // this.addCustomerinfo();
    // this.getProducts();

    this.addPaymentinfo();

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
  addPaymentinfo() {
    this.error = '';
    this.success = '';
    console.log(this.paymentId);
    console.log(this.paymentStatus);
    console.log(this.paymentCreateTime);

    this.paymentinfoService.store({referenceNo: this.referenceNo, paymentId: this.paymentId, paymentStatus: this.paymentStatus, paymentTime: this.paymentCreateTime})
      .subscribe(
        (res: Paymentinfo[]) => {
          // Update the list of cars
          this.paymentinfos = res;

          // Inform the user
          this.success = 'Created successfully';

        },
        (err) => this.error = err
      );
  }
}
