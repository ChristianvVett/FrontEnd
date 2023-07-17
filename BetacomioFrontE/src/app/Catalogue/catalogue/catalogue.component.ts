import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
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
