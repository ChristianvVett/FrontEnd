import { Component,AfterViewChecked } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http'
import { TokenService } from 'src/app/Services/token.service';
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


declare let paypal:any

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements AfterViewChecked {
[x: string]: any;

  constructor(
    private http: HttpClient,
    private token: TokenService,
    private getMethodsService: GetMethodsService
  ) {}

  addScript:boolean = false;
  finalAmount: number = 1;
  Creditcard=faCreditCard;
  resultCart: cartItem[] = [];
  HaToken = JSON.parse(this.token.rew);
  idToken: number;
  totPrice: number;
  sommaTot: number
  totoarro: string;
  userID: number;
  unitprice: number;
  quantity: number; 
  product: number;
 

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
   
    this.idToken = parseInt(this.HaToken.id) + 11;

    this.getMethodsService.getCartProducts(this.idToken).subscribe(response =>{
    this.resultCart = response; 
    console.log(this.resultCart)
    this.totPrice = this.getMethodsService.calculateCartTotal(this.resultCart);//calcola totale carrello
    
    if (this.totPrice != 0) {
      this.sommaTot = this.totPrice + 50;
      this.totoarro = this.sommaTot.toFixed(2)
    }
     
     
  

        for(const el of this.resultCart){
          console.log(el.product);
          el.product.sanitizedPhoto = this.getMethodsService.getProductImage(el.product.thumbNailPhoto);
        }
       
      })


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

  payment(indirizzo: HTMLInputElement , cpdicepostale: HTMLInputElement , city: HTMLInputElement, regione: HTMLInputElement , stato: HTMLInputElement , numerocivico: HTMLInputElement){

    console.log(this.resultCart);
    for(const elem of this.resultCart){
      this.userID = elem.userId
      this.quantity = elem.quantity
      this.product = elem.productId
      this.unitprice = elem.unitPrice

      
    }
    const data ={
     Address: indirizzo.value,
     PostalCode: cpdicepostale.value,
     Region: regione.value,
     Country: stato.value,
     City: city.value,
     AddressDetail: numerocivico.value,
     CustomerID: this.userID,
     TotalPrice: this.totPrice,   //totale di ciascun prodotto
     UnitPrice: this.unitprice,
     ProductID: this.product,
     OrderQty: this.quantity,
     SubTotal: this.totoarro
    }
    
this.http.post<any>("https://localhost:7284/api/OrderProxies" , data).subscribe((resp) => {})
  }
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalconfig,'#paycheck')
        });

    }
  }

 



}

export interface cartItem{

  userId : number,
  productId: number, 
  quantity: number, 
  unitPrice:number,
  totalPrice: number,
  product: {
    name: string,
    listPrice: number,
    thumbNailPhoto: Uint8Array,
    sanitizedPhoto: SafeUrl
  }

}


