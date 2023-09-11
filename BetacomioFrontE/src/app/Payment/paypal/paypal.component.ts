import { Component,AfterViewChecked } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http'
import { TokenService } from 'src/app/Services/token.service';

declare let paypal:any
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {

  constructor(
    private http: HttpClient,
    private token: TokenService
  ) {}

  addScript:boolean = false;
  finalAmount: number = 1;
  Creditcard=faCreditCard;
  resultCart: cartItem[] = [];
  HaToken = JSON.parse(this.token.rew);
  idToken: number;

  totalPrice = 0;
  totalQuantity = 0;
  

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


  ngOnInit(){
   
    this.getCartProducts();

    }

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

  //metodo per visualizzare prodotti del carrello dell'utente loggato
  getCartProducts(){
   
    this.idToken = parseInt(this.HaToken.id) +11;
    console.log(this.idToken);
    this.http.get<any>(`https://localhost:7284/api/ShoppingCart?userid=${this.idToken}`).subscribe(response =>{
    this.resultCart = response; 
    this.calculateTotals();
    console.log(this.resultCart);
    })
  }

  //calcolo della somma di prezzi e quantità del carrello
  calculateTotals(){
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for(const val of this.resultCart){
      this.totalPrice += val.totalPrice;
      this.totalQuantity += val.quantity;
    }
  }

}

interface cartItem{

  userId : number,
  productId: number, 
  quantity: number, 
  unitPrice:number,
  totalPrice: number,
  product: {
    name: string,
    listPrice: number,
  }

}


