import { Component, OnInit } from '@angular/core';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { OrderDetailsService } from 'src/app/Services/order-details.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  icon=faRightLong;

  constructor(private service:OrderDetailsService) { }
  bikeData:any;
  ngOnInit(): void {
    this.bikeData = this.service.bikeDetails;
  }

}
