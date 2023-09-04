import { Component , Renderer2 } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent {
  UsersList:users[]=[];
  constructor(private http:HttpClient, private rendered:Renderer2){

  }

  ngOnInit(){
    this.users();
  }

  users(){
    this.http.get<any>("https://localhost:7284/api/UserCredentials").subscribe((request)=>{
      this.UsersList=request;
      console.log(this.UsersList)
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
