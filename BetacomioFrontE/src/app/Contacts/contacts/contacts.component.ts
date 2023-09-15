import {Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {NgForm} from '@angular/forms';
import { EmailsenderService } from 'src/app/Services/emailsender.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(private emailsender:EmailsenderService, http:HttpClient,private router: Router){
    this.http = http
  }
  okFile: boolean = false;

  person: persona = {
    UserID:null,
    Email: '',
    Object: '',
    Description: '',
    File:null
  };

  http:HttpClient;

  lenghtnotok = false;
  charnotok = false;

  rlength=false;

   dlength=false;

   nlength=false;
   allok=false;


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
      if(sessionStorage != null){
        var session = sessionStorage.getItem("dati");
        var jsonobj = JSON.parse(session);
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

      this.person = input.value;
      // this.emailsender.sendEmail(this.person.Object,this.person.Description);
      this.getUserID();
      this.http.post<any>("https://localhost:7284/api/UserRequestsTemps",this.person).subscribe(resp=>{

      })
      this.router.navigate(['/LandingPage'], { queryParams:{ formData: JSON.stringify(this.person) } });

      input.reset();

    }

    fileselected(event: any) {
      let file: File = event.target.files[0];
      if (file) {
          const validFile = this.isValidFileType(file);
          this.okFile = !validFile;
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
  File:string

}
