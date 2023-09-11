
import { Component, OnChanges, OnInit,ChangeDetectorRef } from '@angular/core';
import { Directive, ViewChild, Renderer2 , ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';
import { Router } from '@angular/router'; // Importa il servizio di routing


@Component({
  selector: 'app-confirm-pass',
  templateUrl: './confirm-pass.component.html',
  styleUrls: ['./confirm-pass.component.css']
})
export class ConfirmPassComponent {
  @ViewChild("buttonModal" , {read: ElementRef}) buttonModal: ElementRef;
codice: number;
password: string;
email: string;
  constructor(private http: HttpClient , private router: Router , private render: Renderer2 , private ref: ElementRef){

  }

  onSubmit(confirm: NgForm){
    
const Dati = {
  password: this.password,
  codice: this.codice,
  email: this.email
}

    this.http.post<any>("https://localhost:7284/api/RememberPass/key/RememberPass", Dati).subscribe((resp) => {

    if (HttpStatusCode.Ok) {
this.router.navigateByUrl("/");
    }
    })

  }
}
