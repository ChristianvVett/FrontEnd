import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private Http:HttpClient){}
  loglist:register={Username:"",Name:"",Surname:"",Email:"",Phone:null,Password_Hash:""}
  aaa(elem:NgForm){
    this.loglist=elem.value;
    this.Http.post("https://localhost:7284/api/Users",elem.value).subscribe(result => {
      
    })
    
  }

  
}

interface register{
  Username:string,
  Name:string,
  Surname:string,
  Email:string,
  Phone:number
  Password_Hash:string
}