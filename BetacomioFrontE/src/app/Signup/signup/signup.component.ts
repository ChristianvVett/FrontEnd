import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http';
import { OnChange } from 'ngx-bootstrap/utils';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private Http: HttpClient) {
    this.singleUser={Name:"",Surname:"",Username:"",Phone:"" ,Email:"",PasswordHash:"",PasswordSalt:"",BirthYear:""}
  }

  Userlist: any[] = []
  singleUser: register | null = null
  isNameOk:boolean = false;
  isSurnameOk:boolean=false;
  isPhoneOk:boolean=false;
  isUsernameOk:boolean=false;
  isEmailOk:boolean=false;
  isPasswordOk:boolean=false;
  regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/\-=]/;
  regexnum = /\d/;
  regexMaiuscole = /[A-Z]/;
  allOk:boolean=false;
  EmailAlreadyTaken:boolean=false;
  InsertUser(elem: NgForm) {
    this.singleUser = elem.value;
    this.Http.post<register>('https://localhost:7284/api/UserCredentials', elem.value, {observe: 'response'}).subscribe(
      (response: HttpResponse<register>) =>
      {
        if (HttpStatusCode.Ok) {
          console.log("registrazione effettuata con successo, stato: " + response.status)
        }else if(HttpStatusCode.BadRequest){ console.log("errore in fase di registrazione  " + response.status)}
      }
    );
  }
checkAllField(){
  if(!this.isNameOk==true && !this.isSurnameOk==true && !this.isEmailOk==true && !this.isPhoneOk==true && !this.isUsernameOk==true && !this.isPasswordOk==true){
    this.allOk=true;
  }else{
    this.allOk=false;
  }
}


  checkName(){
    if(this.singleUser.Name.length <= 4){
      this.isNameOk = true;
    }else if(this.singleUser.Name.length > 4){
      this.isNameOk=false;
    }
  }

  checkSurname(){
    if(this.singleUser.Surname.length<=4 || this.singleUser.Surname.includes(" ")){
      this.isSurnameOk=true;
    }else{
      this.isSurnameOk=false;
    }
  }



  checkuserName(){
    if(this.singleUser.Username.length < 4){
      this.isUsernameOk=true;
    }else if(this.singleUser.Username.length >4){
      this.isUsernameOk=false;
    }
  }

  checkEmail(){
    if(this.singleUser.Email.length <=5 || !this.singleUser.Email.includes("@")){
      this.isEmailOk=true;
    }else{
      this.isEmailOk = false;
    }
    // this.getAllDatas();
    // console.log(this.Userlist)
  }
// !this.singleUser.PasswordHash.toUpperCase()
  checkPassword(){
    if(!this.regex.test(this.singleUser.PasswordHash) || !this.regexnum.test(this.singleUser.PasswordHash) || !this.regexMaiuscole.test(this.singleUser.PasswordHash)){
      this.isPasswordOk=true;
      console.log(this.isPasswordOk)
    }else{
      this.isPasswordOk=false;
    }
    this.checkAllField();
  }

  getAllDatas(){
    this.Http.get<any>("https://localhost:7284/api/UserCredentials").subscribe(el=>{
      for(let i = 0; i< el.length;i++){
        if(this.singleUser.Email ==  el[i].email){
          this.EmailAlreadyTaken=true;
          break;
        }else if(!this.singleUser.Email == el[i].email){
          this.EmailAlreadyTaken=false;
          break;
        }
        this.EmailAlreadyTaken=false;
      }
    })
  }
}

interface register {
  Username: string;
  Name: string;
  Surname: string;
  Email: string;
  Phone: string;
  PasswordHash: string;
  PasswordSalt: string;
  BirthYear: string;
}

