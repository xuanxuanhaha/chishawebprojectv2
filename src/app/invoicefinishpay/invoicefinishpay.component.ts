import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

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
  constructor(private data: DataService, private router: Router) { }

  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message);
    console.log(this.router.url);
    // /stripepayment/6.5,1,3,4,1,93122054,from%20cart
    const urlmessage = this.router.url;
    this.refIDNofrompaypal = urlmessage.split('/').splice(-1)[0];
    console.log(this.refIDNofrompaypal);
    let refIDNofrompaypalArray = [];
    refIDNofrompaypalArray = this.refIDNofrompaypal.split(',');
    console.log(refIDNofrompaypalArray);

    this.totalAmount = refIDNofrompaypalArray[0];
    console.log(this.totalAmount);
    refIDNofrompaypalArray.shift();
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
  }

}
