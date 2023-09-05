import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient , HttpResponse , HttpStatusCode} from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(private Http: HttpClient) {}
      
  Userlist: register[] = []
  singleUser: register | null = null

  InsertUser(elem: NgForm) {
    this.singleUser = elem.value;
    this.Http.post<register>('https://localhost:7284/api/UserCredentials', elem.value, {observe: 'response'}).subscribe(
      (response: HttpResponse<register>) => 
      {
        if (HttpStatusCode.Ok) {
          console.log("registrazione effettuata con successo" + response.status)
        }else if(HttpStatusCode.BadRequest){ console.log("errore in fase di registrazione  " + response.status)}
      }
    );
  }
}

interface register {
  Username: string;
  Name: string;
  Surname: string;
  Email: string;
  Phone: number;
  PasswordHash: string;
  PasswordSalt: string;
}
