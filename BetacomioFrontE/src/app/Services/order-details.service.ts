import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
//dddd
  constructor() { }

  // bikedetails

  bikeDetails = [
    {
      id:1,
      bikeName:"Mountain bike",
      bikeDetails:"Mountain bike",
      bikePrice:200,
      bikeImg:"https://www.diruvo.com/images/thumbs/0003974_vektor-e-raw-bici-da-corsa-elettrica-fsa-2023.jpeg"
    },
    {
      id:2,
      bikeName:"City bike",
      bikeDetails:"City bike",
      bikePrice:369,
      bikeImg:"https://www.ellenacicli.it/wp-content/uploads/2018/08/sempion-antares-28-7-v.jpg"
    },
    {
      id:3,
      bikeName:"Cyclette",
      bikeDetails:"Cyclette",
      bikePrice:149,
      bikeImg:"https://webapi-prod.technogym.com/dw/image/v2/BFLQ_PRD/on/demandware.static/-/Sites-tg-catalog-master/default/dwaf7c4c89/product/DCCA3B/technogym_cycle_gallery_001.jpg?sw=1840&sh=1380"
    },
    {
      id:4,
      bikeName:"Forest bike",
      bikeDetails:"Forest bike",
      bikePrice:140,
      bikeImg:"https://bikepgh.org/wp-content/uploads/2016/05/Screen-Shot-2016-02-03-at-6.50.02-PM-620x621-1.png"
    },
    {
      id:5,
      bikeName:"Bmx",
      bikeDetails:"Bmx",
      bikePrice:105,
      bikeImg:"https://m.media-amazon.com/images/I/61DANxOeysL._AC_SX679_.jpg"
    },
    {
      id:6,
      bikeName:"Electric bike",
      bikeDetails:"Electric bike",
      bikePrice:219,
      bikeImg:"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1024/wtj8esaeslvlscv8glj6"
    }
  ]




}
