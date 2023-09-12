import { Component } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import {ActivatedRoute} from '@angular/router'
import {HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css']
})
export class CataloguedtComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private token: TokenService,
    private sanitizer: DomSanitizer
  ) {}
  circle = faCircle;
  productname: string;
  cuore = faHeart;
  langDetailList: any[] = [];
  prodQuantity: number = 1;
  DetailList: biciycleDetail = {} as biciycleDetail;
  tokenData = JSON.parse(this.token.rew);
  lang : number;

  ngOnInit() {
    this.route.paramMap.subscribe((elem) => {
      this.productname = elem.get('productname');

      if(this.tokenData == null || this.tokenData == undefined){
        console.log("DETTAGLIO PRODOTTO STANDARD")
        this.getProductDetails_Standard(this.productname);
       }
       else{
        console.log("DETTAGLIO PRODOTTO IN LINGUA")
         this.lang = parseInt(this.tokenData.language);
         this.getProductDetails_Lang(this.productname, this.lang);
        }
    });
   
  }

  // Visualizza dettaglio prodotto standard
  getProductDetails_Standard(productName: string) {
    this.http
      .get<any>(`https://localhost:7284/api/ViewAdminProducts/${productName}`)
      .subscribe((result) => {
        this.DetailList = result;
        this.DetailList.sanitizedPhoto = this.getProductImage(this.DetailList.thumbnailPhoto);

      });
    }

  // Visualizza dettaglio prodotto con lingua (utente loggato)
  getProductDetails_Lang(productName: string, nationality: number) {
    this.http
      .get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}?nationality=${nationality}`)
      .subscribe((result) => {
        this.DetailList = result;
        this.DetailList.sanitizedPhoto = this.getProductImage(this.DetailList.thumbnailPhoto);

        this.langDetailList.push(result);
        console.log(this.DetailList);

      });
  }

    //Metodo che permette di convertire array di byte in immagini
    getProductImage(imageData: Uint8Array) {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(base64Image);
  
      return sanitizedUrl;
    }

  // Metodo per inserire un prodotto in wishlist
  wish() {

    const wishData = {
      userID: parseInt(this.tokenData.id) + 11, //necessario mettere +11 per sincronizzare ID dei due database
      productId: this.langDetailList[0].productId
    }   


    console.log(this.tokenData.id);
    console.log(wishData.productId);

    this.http
      .post('https://localhost:7284/api/WishlistTemps', wishData)
      .subscribe((resp: HttpResponse<biciycleDetail>) => {
        try {
          if (HttpStatusCode.Ok) {
            console.log('invio in Wishlist effettuato correttamente: stato' + resp.status);
          } else {
            throw console.log('errorino: stato ' + resp.status);
          }
        } catch (error) {}
      });
  }

  // Metodo per inserire un prodotto nel carrello
  cart(){
    const cartData = {
      userID: parseInt(this.tokenData.id) + 11, //necessario mettere +11 per sincronizzare ID dei due database
      productId: this.langDetailList[0].productId,
      quantity: this.prodQuantity,
      unitPrice: this.langDetailList[0].listPrice,
      totalPrice: (this.prodQuantity * this.langDetailList[0].listPrice)
    }   

    console.log(cartData.userID);
    console.log(cartData.quantity);
    console.log(cartData.productId);

    this.http
      .post('https://localhost:7284/api/ShoppingCartTemps', cartData)
      .subscribe((resp: HttpResponse<biciycleDetail>) => {
        try {
          if (resp.status === 200) {
            console.log('invio in ShoppingCart effettuato correttamente: stato' + resp.status);
          } else {
            throw console.log('errorino: stato ' + resp.status);
          }
        } catch (error) {}
      });

  }

 // Metodi per incrementare o decrementare quantità di un prodotto per carrello
  incrementQuantity() {
    if(this.prodQuantity < 9){
      this.prodQuantity++;
    }
  }
  decreaseQuantity(){
    if(this.prodQuantity > 1){
    this.prodQuantity--;
    } 
    
  }

}

// getProductDetails(productName: string) {    ERRORE DA NON FARE PER NON BESTEMMIARE :)
//   this.http
//     .get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}`)
//     .subscribe((result) => {
//       this.DetailList = result;
//       this.langDetailList.push(JSON.stringify(this.DetailList)); //aggiungo dati sui prodotti (manca ID)
//     });
//   }


interface biciycleDetail{
  productId: number, 
  name:string,
  productType: string,
  modelType: string,
  color: string,
  culture: string,
  description:string,
  listPrice:number,
  size: string,
  thumbnailPhoto: Uint8Array,
  sanitizedPhoto: SafeUrl,
  weight: number
}
