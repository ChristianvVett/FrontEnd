
import { Component, OnChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il servizio di routing
import { CatalogueComponent } from 'src/app/Catalogue/catalogue/catalogue.component';
import { TokenService } from 'src/app/Services/token.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-remember-pass',
  templateUrl: './remember-pass.component.html',
  styleUrls: ['./remember-pass.component.css']
})


export class RememberPassComponent {

email: string = "";
constructor(private http: HttpClient){}
onSubmit(elem: NgForm) {

    const emai = { email : this.email}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); //non necessario
this.http.post("https://localhost:7284/api/RememberPass" , emai).subscribe(
  (resp) => 
  {


  })
   
 
    }
  
}
