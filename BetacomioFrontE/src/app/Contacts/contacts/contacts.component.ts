import {Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { EmailsenderService } from 'src/app/Services/emailsender.service';
import { PostContactsService } from 'src/app/Services/postMethods.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(private emailsender:EmailsenderService, private srvpost:PostContactsService,private router: Router){
    
  }
  okFile: boolean = false;
  
  person: persona = {
    email: '',
    name: '',
    request: '',
    detail: '',
    file:''
  };
  
  
  
  lenghtnotok = false;
  charnotok = false;
  
  rlength=false;
  
   dlength=false;

   nlength=false;
   allok=false;
   
   
   checkemail(){
     this.lenghtnotok=this.person.email.length<5
     this.charnotok=!this.person.email.includes('@');
     if(this.lenghtnotok||this.charnotok){
       this.allok=true;
      }else{
        this.allok=false
      }
    }
    
    checkname(){
      this.nlength=this.person.name.length<5
      if(this.nlength){
        this.allok=true;
      }else{
        this.allok=false
      }
    }
    
    checkrequired(){
      this.rlength=this.person.name.length == 0
      if(this.rlength){
        this.allok=true;
      }else{
        this.allok=false
      }
    }
    
    checkdetail(){
      this.dlength=this.person.name.length == 0
      if(this.dlength){
        this.allok=true;
      }else{
        this.allok=false
      }
    }
    
    
    
    submitform(input:NgForm){
      
      this.person = input.value;
      this.emailsender.sendEmail(this.person.name,this.person.request,this.person.detail);
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
  email:string,
  name:string,
  request:string,
  detail:string,
  file:string

}
