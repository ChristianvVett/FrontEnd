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
        this.resultWishList.push(result);
      });
  }

  wish() {
    // const tokenData = JSON.parse(this.toKKen.rew);
    // const tokenUserId = tokenData.id;
    const wishData = {
      userID: 30124,
      productId: this.resultWishList[0].productId
    }   

    console.log(this.resultWishList[0].productId);

    this.http
      .post('https://localhost:7284/api/WishlistTemps', wishData)
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
  productId: number, 
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
