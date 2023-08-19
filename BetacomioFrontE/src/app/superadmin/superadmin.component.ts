import { Component , Renderer2 } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent {

  constructor(private http:HttpClient , private rendered:Renderer2){

  }
  result: any[] = [];
  registryUser(){
  this.http.get<any[]>("https://pokeapi.co/api/v2/nature").subscribe
  ((resp) => { this.result = resp 
    console.log(this.result)
   
  
  
  },
  (error) => {
  console.error("errore nella richiesta http " + error);
  });
  
  

  
  
  }
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
