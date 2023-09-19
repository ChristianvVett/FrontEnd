import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private route: Router) {
    this.setTimeout();
    this.userInactive.subscribe(() => this.reload()
    
    );
    
  }

  setTimeout() {
    let  time = 0;
    this.userActivity = setTimeout(() =>
   
    this.userInactive.next(undefined),
    
    600000);
  

    
  }
  reload(){
    if (sessionStorage.getItem("dati") != null) {
      sessionStorage.clear();
      this.route.navigateByUrl("Login")
      
      
    }else{
      
    }
   
  }

  @HostListener('window:mousemove')refreshUserState() {
    clearTimeout(this.userActivity);
   
    this.setTimeout();
  }
}
