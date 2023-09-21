import { Component,AfterViewChecked } from '@angular/core';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import {HttpClient , HttpHeaders, HttpResponse , HttpStatusCode} from '@angular/common/http'
import { TokenService } from 'src/app/Services/token.service';
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { orderProducts } from 'src/app/MyProfile/myprofile/myprofile.component';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

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

  line= faMinus;
  addScript:boolean = false;
  finalAmount: number = 1;
  Creditcard=faCreditCard;
  resultCart: cartItem[] = [];
  HaToken = JSON.parse(this.token.rew);
  idToken: number;
  totPrice: number;
  taxedTot: number
  finalCost: string;
  userID: number;
  unitprice: any = [];
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
      this.taxedTot = this.totPrice + 50;
      this.finalCost = this.taxedTot.toFixed(2)
    }




        for(const el of this.resultCart){
          console.log(el.product);
          el.product.sanitizedPhoto = this.getMethodsService.getProductImage(el.product.thumbNailPhoto);
        }

      })


  }

  deleteproduct(userId:number,productId:number){

      this.http.delete(`https://localhost:7284/api/ShoppingCart/${userId}/${productId}`).subscribe(resp=>{

        const index = this.resultCart.findIndex(item => item.productId === productId);
        if (index !== -1) {
          this.resultCart.splice(index, 1);}
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

  payment(indirizzo: HTMLInputElement , numerocivico: HTMLInputElement , codicepostale: HTMLInputElement, city: HTMLInputElement , regione: HTMLInputElement , stato: HTMLInputElement){

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    //array con dettagli su ciascun prodotto, per popolare OrderDetail
    const orderDetail: OrderDetailData[] = [];

    for(const val of this.resultCart){
      const detail = {
        ProductId: val.productId,
        OrderQty: val.quantity,
        UnitPrice: val.unitPrice,
        TotalPrice: val.totalPrice
      };
      orderDetail.push(detail);
    }
    console.log(orderDetail)

    //oggetto con dati unici utente e carrello, per popolare Address, OrderHeader e Users
     const uniquedata: UniqueData = {
     CustomerId: this.idToken,
     Address: indirizzo.value,
     AddressDetail: numerocivico.value,
     City: city.value,
     Region: regione.value,
     Country: stato.value,
     PostalCode: codicepostale.value,
     SubTotal: parseFloat(this.finalCost)
    }

    console.log(uniquedata);

    //oggetto che racchiude oggetto con dati unici e oggetto lista
    const orderProxy:OrderProxy = {
      userUniqueData: uniquedata,
      detailData: orderDetail
    }

    console.log(orderProxy);


this.http.post<OrderProxy>("https://localhost:7284/api/OrderProxies" , (orderProxy), {headers: headers}).subscribe((resp) => {
  if(HttpStatusCode.Ok){
    console.log("pagamento effettuato con successo ");
  }else{
    console.log("errore nel pagamento" + HttpResponse.name)
  }
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


// Interfaccia per i dati di dettaglio di un singolo prodotto
export interface OrderDetailData {
  ProductId?: number;
  OrderQty?: number;
  UnitPrice?: number;
  TotalPrice?: number;
}

// Interfaccia per i dati unici dell'utente
export interface UniqueData {
  CustomerId?: number;
  AddressId?: number;
  Address?: string;
  AddressDetail?: string;
  City?: string;
  Region?: string;
  Country?: string;
  PostalCode?: string;
  SubTotal?: number;
}

// Interfaccia per l'oggetto OrderProxy
export interface OrderProxy {
  GenericId?: number;
  userUniqueData: UniqueData;
  detailData: OrderDetailData[]
}


