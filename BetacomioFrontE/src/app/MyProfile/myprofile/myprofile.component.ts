import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  constructor(private http:HttpClient, private getMethods: GetMethodsService){

      //id utente loggato
      this.useridToken = parseInt(this.defJSON.id) + 11;
      this.useridTokenNormal =  parseInt(this.defJSON.id);
  
      //prodotti wishlist
      this.getMethods.getWishlistItems(this.useridToken).subscribe(response =>{
        this.wishlistItems = response; 
  
        for (const el of this.wishlistItems) {
          el.product.sanitizedPhoto = this.getMethods.getProductImage(el.product.thumbNailPhoto);
        }
      })
  
      //prodotti acquisti
      this.getMethods.getOrderDetails(this.useridToken).subscribe(response =>{
        this.orderItems = response;
        console.log(this.orderItems);
  
  
        for (const el of this.orderItems) {
          el.orderDetails.product.sanitizedPhoto = this.getMethods.getProductImage(el.orderDetails.product.thumbNailPhoto);
        }
      })
  }

  stringdata= sessionStorage.getItem("dati");
  stringJSON= this.stringdata.replace(/\[|\]/g, '');
  defJSON=JSON.parse(this.stringJSON);

  useridToken: number;
  useridTokenNormal: number;
  wishlistItems: wishItem[] = [];
  orderItems: orderProducts[] = [];

  usernameProfilo = this.defJSON.username;
  nomeProfilo = this.defJSON.name;
  cognomeProfilo = this.defJSON.surname;
  emailProfilo = this.defJSON.email;




  ngOnInit(){

  

  }




}


export interface wishItem{

  userId : number,
  productId: number,
  addedDate:number,
  product: {
    name: string,
    listPrice: number,
    thumbNailPhoto: Uint8Array,
    sanitizedPhoto: SafeUrl
  }
}

export interface orderProducts{
  orderDate: Date,
  subTotal: number,
  orderDetails: {
    orderDetailId: number,
    orderQty: number,
    unitPrice: number,
    totalPrice: number,
    product: {
      name: string,
      thumbNailPhoto: Uint8Array,
      sanitizedPhoto: SafeUrl
    }
  }
}

