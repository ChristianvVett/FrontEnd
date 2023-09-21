import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { cartItem } from '../Payment/paypal/paypal.component';

@Injectable({
  providedIn: 'root',
})
export class GetMethodsService {
  totalPrice = 0;
  totalQuantity = 0;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  //Visualizzazione prodotti per utenti non registrati
  getProductStandard(): Observable<any> {
    return this.http.get<any>(`https://localhost:7284/api/ViewAdminProducts`);
  }

  //visualizzazione prodotti per lingua, per utenti loggati
  getProductLanguage(language: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7284/api/ViewUserProducts/GetUserProductsByLanguage?nationality=${language}`
    );
  }

  //metodo per visualizzare prodotti del carrello dell'utente loggato
  getCartProducts(tokenId: number): Observable<any> {
    return this.http.get<any>(
      `https://localhost:7284/api/ShoppingCart?userid=${tokenId}`,
    );
  }

  //metodo per visualizzare prodotti wishlist dell'utente loggato
  getWishlistItems(tokenId: number):Observable<any> {
    return this.http
      .get<any>(
        `https://localhost:7284/api/Wishlist?userid=${tokenId}`,

      );
  }

  //metodo per visualizzare ordini acquisti effettuati
  getOrderDetails(tokenId: number):Observable<any>{
    return this.http
      .get<any>(
        `https://localhost:7284/api/OrderHeaders?userid=${tokenId}`,
      )
  }


  //Metodo che permette di convertire array di byte in immagini
  getProductImage(imageData: Uint8Array) {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(base64Image);

    return sanitizedUrl;
  }


  //calcolo della somma di prezzi e quantità del carrello
  calculateCartTotal(cartList: cartItem[]) {
    this.totalPrice = 0;
    this.totalQuantity = 0;

    for (const val of cartList) {
      this.totalPrice += val.totalPrice;
      this.totalQuantity += val.quantity;
    }
    return this.totalPrice;
  }
}
