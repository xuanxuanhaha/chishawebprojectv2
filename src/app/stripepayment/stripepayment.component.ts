import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stripepayment',
  templateUrl: './stripepayment.component.html',
  styleUrls: ['./stripepayment.component.css']
})
export class StripepaymentComponent implements OnInit {
  message: string;
  refIDNofrompaypal = '';
  referenceNo = '';
  totalAmount = 0;
  // how many product Number it have
  productNo = [];
  // Product Id in database
  productId = [];
  chargeCreditCard() {
    const form = document.getElementsByTagName('form')[0];
    console.log(form.cardNumber.value);
    ( <any> window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.expMonth.value,
      exp_year: form.expYear.value,
      cvc: form.cvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        const token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }

  chargeCard(token: string) {
    // const headers = new Headers({'token': token, 'amount': 100});
    const data = {
      'token' : token,
    };
    // console.log(data);
    // this.http.post<any>('http://localhost/src/app/php/paymenttest.php',  data , httpOptions)
    //     .subscribe(data => console.log('data', data), error => console.log('error', error));
    // this.http.post('http://localhost:8080/payment/charge', {}, {headers: headers})
    //   .subscribe(resp => {
    //     console.log(resp);
    //   })
  }

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
