import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-contact-detail-page',
  templateUrl: './contact-detail-page.component.html',
  styleUrls: ['./contact-detail-page.component.css']
})
export class ContactDetailPageComponent {
  routes:any;
  detailperson:persona={} as persona
  id:number = 1
constructor(route:ActivatedRoute,private http:HttpClient,private cvImage:GetMethodsService)
{
  this.routes=route
}

ngOnInit(){
  this.routes.paramMap.subscribe(elem=>{
    this.id = elem.get("requestId")
    this.getSingleContact(this.id)
  })
}
getSingleContact(id:number){
  this.http.get<any>(`https://localhost:7284/api/UserRequestsTemps/${id}`).subscribe(resp=>{
    // this.cvImage.getProductImage(resp.image)

    this.detailperson =resp;
    this.detailperson.imageUrl = this.cvImage.getProductImage(resp.image)
    console.log(resp)
})
}
}
interface persona{
  requestId:number,
  userId:string,
  email:string,
  object:string,
  description:string,
  image:Uint8Array,
  imageUrl:SafeUrl
}

