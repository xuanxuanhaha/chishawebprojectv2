import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-stripepayment',
  templateUrl: './stripepayment.component.html',
  styleUrls: ['./stripepayment.component.css']
})
export class StripepaymentComponent implements OnInit {
  message: string;
  chargeCreditCard() {
    const form = document.getElementsByTagName('form')[0];
    console.log(form.cardNumber.value);
    (<any>window).Stripe.card.createToken({
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

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

}
