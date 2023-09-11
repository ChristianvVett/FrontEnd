import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { GetMethodsService } from 'src/app/Services/get-methods.service';
import { SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  constructor(private http:HttpClient, private getMethods: GetMethodsService){}

  stringdata= sessionStorage.getItem("dati");
  stringJSON= this.stringdata.replace(/\[|\]/g, '');
  defJSON=JSON.parse(this.stringJSON);

  useridToken: number;
  wishlistItems: wishItem[] = [];

  usernameProfilo = this.defJSON.username;
  nomeProfilo = this.defJSON.name;
  cognomeProfilo = this.defJSON.surname;
  emailProfilo = this.defJSON.email;




  ngOnInit(){
   
    this.useridToken = parseInt(this.defJSON.id) + 11;
    this.getMethods.getWishlistItems(this.useridToken).subscribe(response =>{
      this.wishlistItems = response; 

      for (const el of this.wishlistItems) {
        el.product.sanitizedPhoto = this.getMethods.getProductImage(el.product.thumbNailPhoto);
      }
    })
  }


  //   this.http.get('https://localhost:7284/api/UserCredentials').subscribe((result)=>{
  //     this.profile.push(result);
  //   for(let i = 0; i<this.profile.length;i++){
  //     let gfd=this.profile[i];
  //     for (const key in gfd) {
  //       let email = gfd[key].email
  //       console.log(email)
  //       if(email == this.email){
  //         console.log("esiste");
  //         this.SingleProfile =gfd[key]
  //         console.log(this.SingleProfile)
  //       }else{
  //         console.log("non esiste")
  //       }
  //     }
  //   }
  // })



}


interface wishItem{

  userId : number,
  productId: number,
  addedDate:number,
  product: {
    name: string,
    listPrice: number,
    thumbNailPhoto: Uint8Array,
    sanitizedPhoto: SafeUrl
  }
}
