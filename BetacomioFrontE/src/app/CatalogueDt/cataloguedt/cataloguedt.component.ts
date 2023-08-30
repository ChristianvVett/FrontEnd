import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { faCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-cataloguedt',
  templateUrl: './cataloguedt.component.html',
  styleUrls: ['./cataloguedt.component.css']
})
export class CataloguedtComponent {
constructor(private route:ActivatedRoute,private http:HttpClient){}
circle= faCircle;
productname:string;
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
}
interface biciycleDetail{
  name:string,
  detail:string,
  listPrice:string
  description:string
}
