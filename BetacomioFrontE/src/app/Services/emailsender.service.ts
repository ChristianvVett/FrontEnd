import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';


@Injectable({
  providedIn: 'root'
})
export class EmailsenderService {

  constructor() {
    emailjs.init('mIkEkY3ezqk1oFYMV');
  }

  public sendEmail(Object:string,Description:string) {
    const templateParams={
      from_request:Object,
      message:Description

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
