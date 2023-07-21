import { Component } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NgbPaginationFirst, NgbPaginationLast } from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {

    // font awesome icons
  istrue:boolean=true;

  icon=faChevronRight;
  icon2=faChevronLeft;
  plus=faPlus;
  minus = faMinus;
  magnifyGlass=faMagnifyingGlass;
  widthplus:number = 0

  // variables and array
  p:number=1;
  blist:bici[]=[];
  searchOn:boolean=false;
  searchlist:bici[]=[]
  constructor(private http:HttpClient){}
  ngOnInit(){
  this.http.get<any>('https://localhost:7284/api/Products1').subscribe((result)=>{
    this.blist=result;
    console.log(this.blist);
  })

}
transformPlus(){
  if(this.istrue){

    this.istrue = false;
    this.widthplus+=600;
    console.log(`plus${this.istrue}`)
  }
}

transformMinus(){
  if(this.istrue == false){

    this.istrue = true;
    this.widthplus-=600;

    console.log(`minus${this.istrue}`)
  }
  }
  toggle(){
    this.istrue =!this.istrue;
  }
arrotondo(num:any){
  return  Math.floor(num);
}

increasePage(p:number){
  if(NgbPaginationLast){
    this.p+=0
  }else{

    this.p++;
  }

}

decreasePage(p:number){
  if(NgbPaginationFirst){
    this.p-=0
  }else{

    this.p--;
  }
}

serchArticles(input :HTMLInputElement){
  if(input.value == ' '){
    this.searchOn = false
  }else{

    this.searchOn = true
     var lista =  this.blist.filter(elem=>elem.name.toLowerCase().includes(input.value.toLowerCase()));
     this.searchlist = lista
     console.log(this.searchlist)
  }

}
}


interface bici{
  name:string,
  listPrice:number


}
