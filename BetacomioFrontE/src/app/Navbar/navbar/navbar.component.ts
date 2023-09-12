import { Component ,ChangeDetectorRef, Renderer2  } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';
import { cartItem } from 'src/app/Payment/paypal/paypal.component';

import { Router } from '@angular/router';
declare let paypal: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  icon=faBars;
  cart=faCartShopping;
  moon=faMoon;
  iconCart: cartItem[] = [];
  totPrice: number;
  tokenData = JSON.parse(this.Token.rew);
  tokenId : number;
  df:string;
  result: string;
  tr: boolean;
  IsLogged:any;
  session: string;
  cfd:boolean;
  showMenu:boolean;
  rnd:any;
  change:boolean = false;
  tok = this.Token.token();
  constructor(
    private Token:TokenService,
    private cdr: ChangeDetectorRef,
    private render:Renderer2, 
    private route: Router, 
    private getMethodsService: GetMethodsService
    ){
  this.rnd = render
  }

  ngOnInit() {
    this.Token.isAuthenticated$.subscribe(isAuthenticated => {
      this.IsLogged = isAuthenticated;
      this.cdr.detectChanges();
      if(this.tokenData != null || this.tokenData != undefined){
        this.showCartIconProducts();
      }
      

    });
  }
  cartmenu(){
    this.showMenu=!this.showMenu;
  }

  showCartIconProducts(){
    this.tokenId = parseInt(this.tokenData.id) + 11;
    this.getMethodsService.getCartProducts(this.tokenId).subscribe(response =>{
      this.iconCart = response; 
      this.totPrice = this.getMethodsService.calculateCartTotal(this.iconCart); //calcola totale carrello
    })
  }

  changeColor(){
    this.change=!this.change;
    if(this.change){
      this.rnd.setStyle(document.body, 'background-color', '#181818');
      this.rnd.setStyle(document.body, 'color', 'white');
    }else{
      this.rnd.setStyle(document.body, 'background-color','white')
      this.rnd.setStyle(document.body, 'color', 'black');
    }
  }

  //icon1=faHouse;
  //icon2=faBookOpen;
  //icon3=faUserPlus;
  //icon4=faAddressBook;
  //icon5=faXmark;
  closeMobileMenu() {
    const mobileMenuCheckbox = document.getElementById('check') as HTMLInputElement;
    mobileMenuCheckbox.checked = false;
    }



    logout(){
    sessionStorage.clear()
    window.location.reload();
    this.route.navigateByUrl("/");
    }



}
