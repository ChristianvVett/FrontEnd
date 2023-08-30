import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il servizio di routing
import { CatalogueComponent } from 'src/app/Catalogue/catalogue/catalogue.component';
import { TokenService } from 'src/app/Services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  users: Person[] = [];
  single: Person | null =  null;
  kd:Boolean;
  tk:string;
  constructor(private http: HttpClient , private route:Router,private Token:TokenService )
  {
    this.tk = this.Token.result;
  }





  login(elem: NgForm){

    const username = elem.value.email;
    const password = elem.value.pass;
    const base64credential = window.btoa(username + ":" + password)
    const result = [];

    // Create a Basic Authentication header
    const headers = new HttpHeaders({ 'Authorization': 'Basic ' + base64credential, });
      console.log(headers)
    this.http.post<any>('https://localhost:7284/api/Login', {base64credential} , {headers} ).subscribe((resp) => {


    console.log(resp);

    resp.forEach(element => {
      console.log(element)
      result.push(element);
    });
    console.log(result[0]);
    const data = sessionStorage.setItem("dati" , JSON.stringify(result[0]) );
   window.location.reload();
   this.route.navigateByUrl('');
     })


   }


}
export interface Person{
  email:string
  pass:number
}
