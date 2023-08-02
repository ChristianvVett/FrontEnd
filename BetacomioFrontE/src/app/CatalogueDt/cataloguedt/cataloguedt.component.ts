import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css']
})
export class CataloguedtComponent {
constructor(private route:ActivatedRoute,private http:HttpClient){}

productId:number;
DetailList:biciycleDetail= {} as biciycleDetail

ngOnInit(){
  this.route.paramMap.subscribe(elem => {

    this.productId = Number(elem.get('productId'));
    this.getProductDetails(this.productId);
    })
}

getProductDetails(productId: number) {
  this.http.get<any>(`https://localhost:7284/api/Products1/${productId}`)
    .subscribe((result) => {
      this.DetailList = result;
    });
}
}
interface biciycleDetail{
  productId:number,
  name:string,
  detail:string,
  price:string
}
