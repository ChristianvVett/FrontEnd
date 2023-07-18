import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

    // font awesome icons
  icon=faChevronRight;
  icon2=faChevronLeft;
  magnifyGlass=faMagnifyingGlass;

  // variables and array
  p:number=1;
  blist:bici[]=[];
  searchOn:boolean=false;
  searchlist:bici[]=[]
  constructor(private http:HttpClient){}
  ngOnInit(){
  this.http.get<any>('https://localhost:7284/ProductModels').subscribe((result)=>{
    this.blist=result;

  })

}
arrotondo(num:any){
  return  Math.floor(num);
}

increasePage(p:number){
   this.p++;

}

decreasePage(p:number){
this.p--;
}

serchArticles(input :HTMLInputElement){
  if(input.value == ' '){
    this.searchOn = false
  }else{

    this.searchOn = true
     var lista =  this.blist.filter(elem=>elem.name.includes(input.value))
     this.searchlist = lista
     console.log(this.searchlist)
  }

}
}


interface bici{
  productModelId:number
  name:string,
  products:[{
    standardCost:number
  }]

}
