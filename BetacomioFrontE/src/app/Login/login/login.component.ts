import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private http: HttpClient )
  {
  }
  users: Person[] = [];
  single: Person | null =  null;
  login(elem: NgForm){
  
    const username = elem.value.email;
    const password = elem.value.pass;
    const base64credential = window.btoa(username + ":" + password)
    

    // Create a Basic Authentication header
    const headers = new HttpHeaders({ 'Authorization': 'Basic ' + base64credential, });
      console.log(headers)
    this.http.post<any>('https://localhost:7284/api/ViewUserProducts', {base64credential} , {headers} ).subscribe((resp) => {})
  }



  
}
export interface Person{
  email:string
  pass:number
}