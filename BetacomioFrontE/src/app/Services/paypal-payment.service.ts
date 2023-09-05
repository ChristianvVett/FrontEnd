// paypal.service.ts

import { Injectable } from '@angular/core';

declare let paypal: any;

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  private addScript: boolean = false;
  private finalAmount: number = 1;

  getFinalAmount(): number {
    return this.finalAmount;
  }

  constructor() {}

  initPaypal() {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalconfig, '#paypal-checkout');
      });
    }
  }

  private addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    });
  }

  private paypalconfig = {
    env: 'sandbox',
    client: {
      sandbox: 'YOUR_SANDBOX_CLIENT_ID',
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {
              amount: { total: 1, currency: 'EUR' },
            },
          ],
        },
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {});
    },
  };
}
