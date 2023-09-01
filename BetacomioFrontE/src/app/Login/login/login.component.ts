import { Component, OnChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il servizio di routing
import { CatalogueComponent } from 'src/app/Catalogue/catalogue/catalogue.component';
import { TokenService } from 'src/app/Services/token.service';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  users: Person[] = [];
  single: Person | null =  null;
  kd:Boolean;
  tk:string;
<<<<<<< HEAD
  ia:NgForm 
  constructor(private http: HttpClient , private route:Router,private Token:TokenService )
=======
  constructor(private http: HttpClient , private route:Router,private Token:TokenService,private ch:ChangeDetectorRef )
>>>>>>> 72860e5ec80e6953e30c089bc99d8f79120b9289
  {
  }

  redirectMyProfile(){

    this.route.navigate(["/MyProfile"])
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
      this.Token.loginSuccessful()
      this.tk = this.Token.result;
      this.ch.detectChanges();
      this.route.navigateByUrl('/MyProfile');


<<<<<<< HEAD
    console.log(resp);

    resp.forEach(element => {
      console.log(element)
      result.push(element);
    });
    console.log(result[0]);
    const data = sessionStorage.setItem("dati" , JSON.stringify(result[0]) );
    window.location.reload();
   this.login(this.ia)
   this.route.navigate(['']);
   
     })
=======
  })
>>>>>>> 72860e5ec80e6953e30c089bc99d8f79120b9289


}


}
export interface Person{
  email:string
  pass:number
}
