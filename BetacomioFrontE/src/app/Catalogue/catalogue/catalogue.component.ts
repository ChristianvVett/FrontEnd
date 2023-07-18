import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
  icon=faChevronRight
  p:number=1;
  blist:bici[]=[];
  constructor(private http:HttpClient){}
  ngOnInit(){
  this.http.get<any>('https://localhost:7284/ProductModels').subscribe((result)=>{
    this.blist=result;

  })

}
arrotondo(num:any){
  return  Math.floor(num);
}




}

interface bici{
  productModelId:number
  name:string,
  products:[{
    standardCost:number
  }]

}
