import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';


@Injectable({
  providedIn: 'root'
})
export class EmailsenderService {

  constructor() {
    emailjs.init('mIkEkY3ezqk1oFYMV');
  }

  public sendEmail(name:string,request:string,detail:string) {
    const templateParams={
      from_name:name,
      from_request:request,
      message:detail

    };
    emailjs.send('service_kopwqad','template_k0hyt5s', templateParams)
      .then((response) => {
        console.log('Email sent successfully!', response);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
}
}
