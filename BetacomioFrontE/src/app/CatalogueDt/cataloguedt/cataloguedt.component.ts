import { Component } from '@angular/core';
import { TokenService } from 'src/app/Services/token.service';
import {ActivatedRoute} from '@angular/router'
import {HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Token } from '@angular/compiler';


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css']
})
export class CataloguedtComponent {
constructor(private route:ActivatedRoute,private http:HttpClient , private token:TokenService){}
circle= faCircle;
productname:string;
cuore=faHeart;
resultWishList: object;
DetailList:biciycleDetail= {} as biciycleDetail
toKKen = this.token;
json: object;
 ngOnInit(){
  this.route.paramMap.subscribe(elem => {
    this.DetailList
    console.log(this.DetailList)
    this.productname = elem.get('productname');
    this.getProductDetails(this.productname);
    })
}

getProductDetails(productName: string) {
  this.http.get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}`)
    .subscribe((result) => {
    
      this.resultWishList = result;
      console.log(this.resultWishList);
    
    });
}

// getProductDetails(productName: string) {    ERRORE DA NON FARE PER NON BESTEMMIARE :)
//   this.http
//     .get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}`)
//     .subscribe((result) => {
//       this.DetailList = result;
//       this.resultWishList.push(JSON.stringify(this.DetailList)); //aggiungo dati sui prodotti (manca ID)
//     });
//   }
wish() {
  //aggiungo dati su utente attivo (manca ID)
  //this.resultWishList.forEach(el => console.log(el));
const wishdata  = {
  wish: this.resultWishList,
  users: JSON.parse(this.toKKen.rew)
}
console.log(wishdata+ "sono wish data")

  this.http
    .post('https://localhost:7284/api/Values', wishdata )
    .subscribe((resp: HttpResponse<biciycleDetail>) => {
      try {
        if (HttpStatusCode.Ok) {
          console.log('invio effettuato correttamente: stato' + resp.status);
        } else {
          throw console.log('errorino: stato ' + resp.status);
        }
      } catch (error) {}
    });
}
}
interface biciycleDetail{
  name:string,
  productType: string,
  modelType: string,
  color: string,
  culture: string,
  description:string,
  listPrice:number,
  size: string,
  thumbnailPhoto: string,
  weight: number

}
