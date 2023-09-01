import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Importa il servizio di routing
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private route:Router) { }
  rew: string = sessionStorage.getItem('dati');
  tok: string ;
  result: string;
  logincomplete:boolean=false;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  loginSuccessful() {
    this.isAuthenticatedSubject.next(true);
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
