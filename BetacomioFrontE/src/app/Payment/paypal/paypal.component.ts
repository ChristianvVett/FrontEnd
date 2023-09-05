import { Component,AfterViewChecked } from '@angular/core';
declare let paypal:any
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {
  addScript:boolean = false;
  finalAmount: number = 1;
  paypalconfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ARWPs-atx9sIQ__3FrCAfobBvHTATMBU3u6tX2dbNpdqVtRP6GoAZZr1eAL1BQmWrGiGA80POdkljZF0',
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: this.finalAmount, currency: 'EUR' }
            }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {

      })
    }
  };
  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve,reject)=>{
      let scripttagElement = document.createElement('script');
      scripttagElement.src='https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload=resolve;
      const container = document.getElementById("sss");
      document.body.appendChild(scripttagElement)
    })
  }
  ngAfterViewChecked(): void {
    if (!this.addScript) {


        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalconfig,'#paycheck')
        });

    }
  }
}
