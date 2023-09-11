import { Component ,ChangeDetectorRef, Renderer2  } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
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
  rew: string = sessionStorage.getItem('dati');
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
  constructor(private Token:TokenService,private cdr: ChangeDetectorRef,render:Renderer2, private route: Router){
  this.rnd = render
  }

  ngOnInit() {
    this.Token.isAuthenticated$.subscribe(isAuthenticated => {
      this.IsLogged = isAuthenticated;
      this.cdr.detectChanges();
    });
  }
  cartmenu(){
    this.showMenu=!this.showMenu;
  }
  changeColor(){
    this.change=!this.change;
    if(this.change){
      this.rnd.setStyle(document.body, 'background-color', '#181818');
      this.rnd.setStyle(document.body, 'color', 'white');
    }else{
      this.rnd.setStyle(document.body, 'background-color','white')
      this.rnd.setStyle(document.body, 'color', 'black');
      console.log("gesu cristo")
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
