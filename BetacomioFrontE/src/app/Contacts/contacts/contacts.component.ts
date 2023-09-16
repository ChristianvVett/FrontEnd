import {Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {NgForm} from '@angular/forms';
import { EmailsenderService } from 'src/app/Services/emailsender.service';
import { Router } from '@angular/router';
import * as base64js from 'base64-js';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(private emailsender:EmailsenderService, http:HttpClient,private router: Router){
    this.http = http
    //ciao
  }
  okFile: boolean = false;
  ciao:Uint8Array[] = [];
  person: persona = {
    UserID:null,
    Email: '',
    Object: '',
    Description: '',
    Image:this.ciao
  };

  http:HttpClient;

  lenghtnotok = false;
  charnotok = false;

  rlength=false;

   dlength=false;

   nlength=false;
   allok=false;
    session = sessionStorage.getItem("dati");

   checkemail(){
     this.lenghtnotok=this.person.Email.length<5
     this.charnotok=!this.person.Email.includes('@');
     if(this.lenghtnotok||this.charnotok){
       this.allok=true;
      }else{
        this.allok=false
      }
    }


    getUserID(){
      if(this.session){
        var jsonobj = JSON.parse(this.session);
         this.person.UserID = jsonobj.id
      }else{
        this.person.UserID = null
      }
    }


    checkdetail(){
      this.dlength=this.person.Description.length == 0
      if(this.dlength){
        this.allok=true;
      }else{
        this.allok=false
      }
    }



    submitform(input:NgForm){
      const imageBase64 = base64js.fromByteArray(this.ciao[0])
      const dataToSend = {
    
   
        UserID: this.person.UserID,
            Email: this.person.Email,
            Object: this.person.Object,
            Description: this.person.Description,
            
           
        Image: imageBase64 // Rappresentazione Base64 dell'array di byte dell'immagine
          };
          console.log(dataToSend.Image)
          const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
   
      this.person = input.value;
      // this.emailsender.sendEmail(this.person.Object,this.person.Description);
      // Imposta l'header Content-Type su 'application/octet-stream'
    
      this.getUserID();
      this.http.post<any>("https://localhost:7284/api/UserRequestsTemps",dataToSend,{headers}).subscribe((resp)=>{
      })
      this.router.navigate(['/LandingPage'], { queryParams:{ formData: JSON.stringify(this.person) } });

      input.reset();

    }

    private async convertImageToByteArray(file: File): Promise<Uint8Array> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          this.ciao.push(uint8Array)
          resolve(uint8Array);
        };

        reader.onerror = (error) => {
          reject(error);
        };

        reader.readAsArrayBuffer(file);
      });
    }

    async fileselected(event: any) {
      let file: File = event.target.files[0];
      if (file) {
          const validFile = this.isValidFileType(file);
          this.okFile = !validFile;
          const byteFile=await this.convertImageToByteArray(file);
      } else {
          this.okFile = false;
      }
  }



  private isValidFileType(file: File): boolean {
      const allowedExtensions = ['.png', '.jpeg', '.jpg'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      return allowedExtensions.includes(`.${fileExtension}`);
  }

}


interface persona{
  UserID:number,
  Email:string,
  Object:string,
  Description:string,
  Image:Uint8Array[]

}
