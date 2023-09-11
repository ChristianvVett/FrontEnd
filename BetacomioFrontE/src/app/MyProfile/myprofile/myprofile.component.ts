import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

  constructor(private http:HttpClient){}

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
   
    this.getWishlistItems();
    console.log(this.defJSON);


    }


    //metodo per visualizzare prodotti wishlist dell'utente loggato
    getWishlistItems(){
        
        this.useridToken = parseInt(this.defJSON.id) + 11;
        console.log(this.useridToken);
        this.http.get<any>(`https://localhost:7284/api/Wishlist?userid=${this.useridToken}`).subscribe(response =>{
        this.wishlistItems = response; 
        console.log(this.wishlistItems);

    })
    };


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
    thumbnailPhoto: Uint8Array,
  }
}
