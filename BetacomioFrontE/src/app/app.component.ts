import { Component, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor() {
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('utente inattivo da 3 secondi'));
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove')refreshUserState() {
    clearTimeout(this.userActivity);
    console.log("sono qui ");
    this.setTimeout();
  }
}
