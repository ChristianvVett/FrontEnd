import { Component } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css']
})
export class CataloguedtComponent {
constructor(private route:ActivatedRoute,private http:HttpClient){}
circle= faCircle;
productname:string;
cuore=faHeart;
resultWishList: any[];
DetailList:biciycleDetail= {} as biciycleDetail

ngOnInit(){
  this.route.paramMap.subscribe(elem => {

    this.productname = elem.get('productname');
    this.getProductDetails(this.productname);
    })
}

getProductDetails(productName: string) {
  this.http.get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}`)
    .subscribe((result) => {
      this.DetailList = result;
    });
}

wish(){


console.log(this.resultWishList);

 this.http.post("https://localhost:7284/api/Values", this.DetailList ).subscribe((resp) => 
 {
   console.log(resp);
 })
 }
}
interface biciycleDetail{
  name:string,
  detail:string,
  price:string
  description:string
}
