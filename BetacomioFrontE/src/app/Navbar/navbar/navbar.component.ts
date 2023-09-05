import { Component , OnInit , Renderer2 , OnChanges, SimpleChanges,ChangeDetectorRef,AfterViewChecked  } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';
declare let paypal: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewChecked {
  icon=faBars;
  cart=faCartShopping;
  rew: string = sessionStorage.getItem('dati');
  df:string;
  result: string;
  tr: boolean;
  IsLogged:any;
  session: string;
  cfd:boolean;
  showMenu:boolean;
  addScript:boolean = false;
  finalAmount: number = 950;
  tok = this.Token.token();
  constructor(private Token:TokenService,private cdr: ChangeDetectorRef){

  }
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
      window.onload=()=>{

        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalconfig,'#paycheck')
        });
      }
    }
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
