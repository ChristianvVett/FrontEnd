import { Component , OnInit , Renderer2 , OnChanges, SimpleChanges } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  icon=faBars;
  cart=faCartShopping;
  rew: string = sessionStorage.getItem('dati');
  tok: string ;
  result: string;
  tr: boolean;
  session: string;
  constructor(private render:Renderer2){
    this.tok = this.token()
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

token(): string{


    if (this.rew == ""  || this.rew ==  null) {
      console.log("elemento sessione vuoto" + this.tok)

      return this.result = null;
      }else if(this.rew != ""){
        console.log(this.rew);
       return this.result = "elemento trovato" + this.rew;


  }
  return "";
}
logout(){
sessionStorage.clear()
window.location.reload();
}


}
