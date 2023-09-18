import { Component , Renderer2 } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { TokenService } from '../Services/token.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
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
  totalmessages:number;
  garbage = faCheck;
  eye=faEye;
  x=faXmark;
  isvisible:boolean;
  isvisible2:boolean;
  constructor(private http:HttpClient, private rendered:Renderer2,token:TokenService){
  this.tok=token
  }

  hideWindow(){
    this.isvisible = !this.isvisible
    if(this.isvisible){
      document.getElementById('window').style.display='block'
    } else{
      document.getElementById('window').style.display='none'
    }
  }

  hideWindowUsers(){
    this.isvisible2 = !this.isvisible2
    if(this.isvisible2){
      document.getElementById('window2').style.display='block'
    } else{
      document.getElementById('window2').style.display='none'
    }
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
  email:string
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
