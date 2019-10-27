import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
declare let paypal: any;
// @ts-ignore
let totalPrice: any;



@Component({
  selector: 'app-paypalpayment',
  templateUrl: './paypalpayment.component.html',
  styleUrls: ['./paypalpayment.component.css']
})
export class PaypalpaymentComponent implements AfterViewChecked, OnInit {
  addScript = false;
  message: string;
  paypalConfig = {
    // Configure environment
    env: 'production',
    client: {
      // Enter your live client ID here
      production: 'ARQZgu-hy4tOb3lhuSPCuls3EGKYMHnK8mHiBbBkx6Un1UR7SEzCeCraKrqCFzeKZ5XF450f0fdAy1nn'
    },
    // Customize button (optional)
    locale: 'en_AU',
    style: {
      size: 'responsive',
      color: 'white',
      shape: 'rect',
      tagline: false,
      label: 'paypal',
    },


    // Enable Pay Now checkout flow (optional)
    commit: true,

    // Set up a payment
    payment(data, actions) {
      // var that = this
      return actions.payment.create({
        transactions: [{
          amount: {
            total:totalPrice,
            currency: 'AUD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize(data, actions) {
      const that = this;
      return actions.payment.execute().then((payment) => {
        // Show a confirmation message to the buyer
        // that.router.navigateByUrl('stripepayment');
        // console.log(payment);
        // that.paymentSuccess();
        // window.alert('Thank you for your purchase!');
        window.location.href = 'http://localhost:4200/ProductShow';
      //  跳转到其他页面

      });
    }
  };

  paymentSuccess() {
    this.router.navigateByUrl('stripepayment');
  }


  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, 'paypal-button');
      });
    }
  }


  // add paypal javascript API
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      // console.log(resolve);
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  constructor(private router: Router, private data: DataService) {
  }

  ngOnInit() {
    this.ngAfterViewChecked();
    this.data.currentMessage.subscribe(message => this.message = message);
    // totalPrice = 0.01;
  }

  jumptoweb() {
    console.log('jhhh');
    this.router.navigateByUrl('stripepayment');
  }
  confirmpay(){
    console.log(this.message);
    totalPrice = Number(this.message);
    console.log(this.message);
  }


}
