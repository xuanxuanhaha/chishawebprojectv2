import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {Confirmproduct} from '../confirmproduct';
import {ConfirmproductService} from '../confirmproduct.service';
declare let paypal: any;
// @ts-ignore
let totalPrice: any;
let printMessage: any;
let referenceNo: any;
let paypalid: any;
let paypalstatus: any;
let paypaltime: any;



@Component({
  selector: 'app-paypalpayment',
  templateUrl: './paypalpayment.component.html',
  styleUrls: ['./paypalpayment.component.css']
})
export class PaypalpaymentComponent implements AfterViewChecked, OnInit {
  addScript = false;
  message: string;
  buyProductIdArray = [];
  buyProductNoArray = [];
  fromCartOrOrder = '';
  referenceNo = '';
  error: '';
  success: string;
  confirmproduct = new Confirmproduct(0, 0, '');
  confirmproducts: Confirmproduct[];
  paypalConfig = {
    // Configure environment
    // env: 'production',
    env: 'sandbox',
    client: {
      // Enter your live client ID here
      // production: 'ARQZgu-hy4tOb3lhuSPCuls3EGKYMHnK8mHiBbBkx6Un1UR7SEzCeCraKrqCFzeKZ5XF450f0fdAy1nn'
      sandbox: 'AduQzS7xgkshjnXWfbdrvct2WwowNotKJIg-EbHm3BQXb8ZLLHr29dm5BU0ipi0DOtZQ27-1F5ept2M6'
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
            total: 0.01,
            currency: 'AUD'
          }
        }]
      });
    },
    // Execute the payment
    onAuthorize(data, actions) {
      return actions.payment.execute().then((payment) => {
        // Show a confirmation message to the buyer
        // that.router.navigateByUrl('stripepayment');
        // console.log(payment);
        // that.paymentSuccess();
        // window.alert('Thank you for your purchase!');
        console.log(payment);
        console.log(payment.id);
        console.log(payment.intent);
        console.log(payment.state);
        console.log(payment.cart);
        console.log(payment.create_time);

        window.location.href = 'http://localhost:4200/invoicefinishpay' + '/' + referenceNo + ','  + payment.id + ',' + payment.state + ',' + payment.create_time;
      //  跳转到其他页面s

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

  constructor(private router: Router, private data: DataService, private confirmproductService: ConfirmproductService) {
  }

  ngOnInit() {
    this.ngAfterViewChecked();
    this.data.currentMessage.subscribe(message => this.message = message);
    // totalPrice = 0.01;
  }


  confirmpay() {
    console.log(this.message);
    printMessage = this.message;
    const message2 = this.message.split(',');
    // know whether from Cart or buy directly(1 product);
    this.referenceNo = message2.slice(-1)[0];
    message2.pop();
    console.log(this.referenceNo);
    referenceNo = this.referenceNo;
    console.log(totalPrice);
    // get total price pass to paypal
    totalPrice = Number(message2[0]);
    console.log(message2);
    // message2.splice(0, 1);
    // console.log(message2);
    // message2.pop();
    // message2.pop();
    // console.log(message2);
    // console.log(this.fromCartOrOrder);

    this.buyProductIdArray = [];
    this.buyProductNoArray = [];
    // get product ID and number customer bought, get the other infomation from database
    for (let i = 0; i < message2.length / 2; i++){
      this.buyProductIdArray.push(message2[i]);
    }
    for (let i = message2.length / 2; i < message2.length; i++){
      this.buyProductNoArray.push(message2[i]);
    }
    console.log(this.buyProductIdArray);
    console.log(this.buyProductNoArray);
    this.addConfirmproduct();
  }

  newMessage() {
    this.data.changeMessage('Hello from Sibling');
  }


  addConfirmproduct() {
    this.error = '';
    this.success = '';

    console.log(this.buyProductIdArray);
    console.log(this.buyProductNoArray)

    for(let i = 0; i < this.buyProductNoArray.length; i++){
      this.confirmproductService.store({referenceNo: this.referenceNo, productId: this.buyProductIdArray[i], productNo: this.buyProductNoArray[i], totalPrice: 0})
        .subscribe(
          (res: Confirmproduct[]) => {
            // Update the list of cars
            this.confirmproducts = res;

            // Inform the user
            this.success = 'Created successfully';

          },
          (err) => this.error = err
        );
    }
  }

}
