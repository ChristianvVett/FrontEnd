import { Component , OnInit , Renderer2 , OnChanges, SimpleChanges,ChangeDetectorRef  } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  icon=faBars;
  cart=faCartShopping;
  rew: string = sessionStorage.getItem('dati');
  df:string;
  result: string;
  tr: boolean;
  IsLogged:any;
  session: string;
  cfd:boolean;
  tok = this.Token.token();
  constructor(private Token:TokenService,private cdr: ChangeDetectorRef){
    console.log(this.tok)
  }

  ngOnInit() {
    this.Token.isAuthenticated$.subscribe(isAuthenticated => {
      this.IsLogged = isAuthenticated;
      this.cdr.detectChanges();
    });
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
    }



}
