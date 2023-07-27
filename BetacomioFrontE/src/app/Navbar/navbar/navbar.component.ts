import { Component } from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  icon=faBars;
  //icon1=faHouse;
  //icon2=faBookOpen;
  //icon3=faUserPlus;
  //icon4=faAddressBook;
  //icon5=faXmark;
}
