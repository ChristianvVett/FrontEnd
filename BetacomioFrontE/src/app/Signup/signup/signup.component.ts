import { ChangeDetectorRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient , HttpHeaders, HttpResponse , HttpStatusCode} from '@angular/common/http';
import { OnChange } from 'ngx-bootstrap/utils';
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import { ToastrService } from 'ngx-toastr';
import { Element } from '@angular/compiler';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent { 
  constructor(private Http: HttpClient , private Google:SocialAuthService , private route:Router,private Token:TokenService,private ch:ChangeDetectorRef, private toastr:ToastrService) {
    this.singleUser={Name:"",Surname:"",Username:"",Phone:"" ,Email:"",PasswordHash:"",PasswordSalt:"",BirthYear:"", Nationality: null}
  }
  kd:Boolean;
  tk:string;
  user: any;
  Userlist: any[] = []
  singleUser: register | null = null
  isNameOk:boolean = false;
  isSurnameOk:boolean=false;
  isPhoneOk:boolean=false;
  isUsernameOk:boolean=false;
  isEmailOk:boolean=false;
  isBirthYearOk:boolean = false;
  isPasswordOk:boolean=false;
  regexPass = /(?=.*[!@#$%^&*()\-_=+[\]{}|\\;:'""<>,.?/~])\S{6,15}/;  //regex password
  regexUsername = /(?=.*[a-zA-Z]{4,12})(?=.*\d.*\d).+/;  //regex username
  regexMail = /([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,6})(\.[a-z]{2,4})?/;  //regex mail
  allOk:boolean=false; 
  EmailAlreadyTaken:boolean=false;
  InsertUser(elem: NgForm) {
    console.log(elem.value);
    const userForLogin = [];
    this.singleUser = elem.value;
    this.Http.post<register>('https://localhost:7284/api/UserCredentials', elem.value, {observe: 'response'}).subscribe(
      (response: HttpResponse<register>) =>
      {
        if (HttpStatusCode.Ok) {
          this.toastr.success("Registrazione effettuata con successo");
          console.log("registrazione effettuata con successo, stato: " + response.status)
          const resp = response.body
          userForLogin.push(resp);
          const valuesArray = Object.values(resp);
          const email = valuesArray[0] ;
          const passHash = valuesArray[1];
          const base64credential = window.btoa(email + ":" + passHash);
          const headers = new HttpHeaders({ 'Authorization': 'Basic ' + base64credential });
          
          this.postLogin(base64credential , headers);
        }else if(HttpStatusCode.BadRequest){ console.log("errore in fase di registrazione  " + response.status)}
      }
    );
  }
checkAllField(){
  if(!this.isNameOk==true && !this.isSurnameOk==true && !this.isEmailOk==true && !this.isPhoneOk==true && !this.isUsernameOk==true && !this.isPasswordOk==true && !this.isBirthYearOk==true){
    this.allOk=true;
  }else{
    this.allOk=false;
  }
}
postLogin(base64credential , headers){
const result = [];
  this.Http.post<any>('https://localhost:7284/api/Login', {base64credential} , {headers} ).subscribe((resp) => {
   
  resp.forEach(element => {
    console.log(element)
    result.push(element);
  });
  console.log(result[0]);
  const data = sessionStorage.setItem("dati" , JSON.stringify(result[0]));
  this.Token.loginSuccessful();
  this.tk = this.Token.result;
  this.ch.detectChanges();

  this.route.navigateByUrl('/MyProfile');
  this.toastr.success("registrazione effettuata con successo")
})
}

  checkName(){
    if(this.singleUser.Name.length < 3){
      this.isNameOk = true;
    }else if(this.singleUser.Name.length >= 4){
      this.isNameOk=false;
    }
  }
  

  checkSurname(){
    if(this.singleUser.Surname.length < 3 || this.singleUser.Surname.includes(" ")){
      this.isSurnameOk=true;
    }else{
      this.isSurnameOk=false;
    }
  }

  checkuserName(){
    if(!this.regexUsername.test(this.singleUser.Username)){
      this.isUsernameOk=true;
    }else{
      this.isUsernameOk=false;
    }
  }

  checkEmail(){
    if(!this.regexMail.test(this.singleUser.Email)){
      this.isEmailOk=true;
    }else{
      this.isEmailOk = false;
    }
    this.getAllDatas();
    console.log(this.Userlist)
  }

  checkDate(){
    const year= [];
    for(const item of this.singleUser.BirthYear.split("-")){
      year.push(item);
    }
    if(year[0] < 1930 || year[0] > 2005){
      this.isBirthYearOk = true;

    }else{
      this.isBirthYearOk = false;
    }
    

  }

  checkPassword(){
    if(!this.regexPass.test(this.singleUser.PasswordHash)){
      this.isPasswordOk=true;
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

  google(){
    console.log("heloworld");
    

    this.Google.authState.subscribe((response) => {
      this.user = response;
      console.log(this.user);


    },
    (error) => {console.error(error.value)}
    )
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
  Nationality: number;
}

