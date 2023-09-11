
import { Component, OnChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il servizio di routing
import { CatalogueComponent } from 'src/app/Catalogue/catalogue/catalogue.component';
import { TokenService } from 'src/app/Services/token.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.css']
})
export class ConfirmPassComponent {

codice: number;
password: string;
email: string;
  constructor(private http: HttpClient){

  }

  onSubmit(confirm: NgForm){
const Dati = {
  password: this.password,
  codice: this.codice,
  email: this.email
}

    this.http.post<any>("https://localhost:7284/api/RememberPass/key/RememberPass", Dati).subscribe((resp) => {})

  }
}
