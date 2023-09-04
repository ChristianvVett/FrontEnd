import { Component } from '@angular/core';

import {ActivatedRoute} from '@angular/router'
import {HttpClient, HttpResponse, HttpStatusCode} from '@angular/common/http'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css'],
})
export class CataloguedtComponent {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private token: TokenService
  ) {}
  circle = faCircle;
  productname: string;
  cuore = faHeart;
  resultWishList: any[] = [];
  DetailList: biciycleDetail = {} as biciycleDetail;
  toKKen = this.token;

  ngOnInit() {
    this.route.paramMap.subscribe((elem) => {
      this.productname = elem.get('productname');
      this.getProductDetails(this.productname);
    });
   
  }

  getProductDetails(productName: string) {
    this.http
      .get<any>(`https://localhost:7284/api/ViewUserProducts/${productName}`)
      .subscribe((result) => {
        this.DetailList = result;
        this.resultWishList.push(JSON.stringify(this.DetailList)); //aggiungo dati sui prodotti (manca ID)
      });
  }

  wish() {
    this.resultWishList.push(this.toKKen.rew); //aggiungo dati su utente attivo (manca ID)
    this.resultWishList.forEach(el => console.log(el));
   

    this.http
      .post('https://localhost:7284/api/Wishlist', this.resultWishList)
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
  listPrice:string,
  size: string,
  thumbnailPhoto: string,
  weight: number
}
