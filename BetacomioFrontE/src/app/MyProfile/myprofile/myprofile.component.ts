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

  usernameProfilo = this.defJSON.username;
  nomeProfilo = this.defJSON.name;
  cognomeProfilo = this.defJSON.surname;
  emailProfilo = this.defJSON.email;





//   ngOnInit(){
//     this.http.get('https://localhost:7284/api/UserCredentials').subscribe((result)=>{
//       this.profile.push(result);
//     for(let i = 0; i<this.profile.length;i++){
//       let gfd=this.profile[i];
//       for (const key in gfd) {
//         let email = gfd[key].email
//         console.log(email)
//         if(email == this.email){
//           console.log("esiste");
//           this.SingleProfile =gfd[key]
//           console.log(this.SingleProfile)
//         }else{
//           console.log("non esiste")
//         }
//       }
//     }
//   })
// }


}
