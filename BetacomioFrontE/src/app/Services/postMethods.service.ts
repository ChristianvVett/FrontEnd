import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PostContactsService {

  constructor(private http:HttpClient) { }

  PostContacts(){
   /*  this.http.post() */
  }
}
