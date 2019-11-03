import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';
import {Customerinfo} from '../customerinfo';
import {CustomerinfoService} from '../customerinfo.service';

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
  // how many product Number it have
  productNo = [];
  // Product Id in database
  productId = [];
  firstname = '';
  lastname = '';
  email = '';
  phone = '';
  customerinfos: Customerinfo[];
  error='';
  success='';
  customerinfo = new Customerinfo('', '', '', 0, 0);
  constructor(private customerinfoService: CustomerinfoService, private data: DataService, private router: Router) { }

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

}
