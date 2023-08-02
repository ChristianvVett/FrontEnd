import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    this.Http.post<register>('https://localhost:7284/api/Users', elem.value).subscribe(
      (result) => {}
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
