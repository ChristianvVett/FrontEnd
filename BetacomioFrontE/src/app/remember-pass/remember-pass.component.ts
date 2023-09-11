
import { Component, OnChanges, OnInit,ChangeDetectorRef ,ViewChild, Renderer2 , ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
//import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient , HttpHeaders,  HttpResponse , HttpStatusCode} from '@angular/common/http';


@Component({
  selector: 'app-remember-pass',
  templateUrl: './remember-pass.component.html',
  styleUrls: ['./remember-pass.component.css']
})



export class RememberPassComponent implements OnInit {
@ViewChild("modal" , {read: ElementRef}) modal: ElementRef;
email: string = "";
constructor(private http: HttpClient, private renderer: Renderer2 , private el:ElementRef){}

ngOnInit(): void {

}

onSubmit(elem: NgForm) {



    const emai = { email : this.email}
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }); //non necessario
this.http.post("https://localhost:7284/api/RememberPass" , emai).subscribe(
  (resp) => 
  {
   if (HttpStatusCode.Ok) {
    console.log("email inviata con successo");
   }

  })
   
 
    }
  
}
