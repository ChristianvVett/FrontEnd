import { Component , Renderer2 } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { TokenService } from '../Services/token.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@angular/router';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent{
  tok:any;
  tak=sessionStorage.getItem("dati");
  UsersList:users[]=[];
  persons:persona[]=[];
  // font awesome icons
  garbage = faCheck;
  eye=faEye;
  constructor(private http:HttpClient, private rendered:Renderer2,token:TokenService){
  this.tok=token
  }

  ngOnInit(){
    this.users();
    this.getMessages();
  }

  getMessages(){
    this.http.get<any>("https://localhost:7284/api/UserRequestsTemps").subscribe((request)=>{
      this.persons=request;
    })
  }

  deleteContact(id:number){
    this.http.delete(`https://localhost:7284/api/UserRequestsTemps/${id}`).subscribe(resp=>{
    })
    location.reload()
  }
  users(){
    this.http.get<any>("https://localhost:7284/api/UserCredentials").subscribe((request)=>{
      this.UsersList=request;
    })
  }

  // Messages(){
  //   this.http.get<any>("") da inserire
  // }

  moove(event){

      let moove = document.getElementById("moove");

   if (event.type == "mouseover") {
    moove.classList.add("fa-bounce");
   }else if(event.type == "mouseout"){

    this.rendered.removeClass(moove, "fa-bounce")
    this.rendered.addClass(moove,"fa-regular-fa-id-card")
   }

  }


}

interface users{
  username:string,
  name:string,
  surname:string,
}
interface persona{
  requestId:number,
  userId:string,
  email:string,
  object:string,
  description:string,
  image:string
}
