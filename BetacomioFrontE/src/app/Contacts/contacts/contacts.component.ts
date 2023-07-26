import {Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
  okFile: boolean = false;
  person:persona[]=[]

  submitform(input:NgForm){
    

   
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

}