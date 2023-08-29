import { Component, OnInit } from '@angular/core';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { OrderDetailsService } from 'src/app/Services/order-details.service';
import {faArrowPointer} from '@fortawesome/free-solid-svg-icons'
import {faListOl} from '@fortawesome/free-solid-svg-icons'
import {faDolly} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  arrowpointer=faArrowPointer;
  dolly=faDolly;
  list=faListOl;
  icon=faRightLong;
  itemsPerSlide = 3;
  slides = [
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/daniel-salcius-RRcYcdGY630-unsplash.jpg'},
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/daniel-salcius-RRcYcdGY630-unsplash.jpg'},
    {image: '../../../assets/images/coen-van-de-broek-OFyh9TpMyM8-unsplash.jpg'},
    {image: '../../../assets/images/daniel-salcius-RRcYcdGY630-unsplash.jpg'},

  ];


  constructor(private service:OrderDetailsService) { }
  bikeData:any;
  ngOnInit(): void {
    this.bikeData = this.service.bikeDetails;
  }

}
