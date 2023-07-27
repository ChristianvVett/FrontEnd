import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-cataloguedetails',
  templateUrl: './cataloguedetails.component.html',
  styleUrls: ['./cataloguedetails.component.css']
})
export class MenupageComponent implements OnInit {

  constructor(private http:HttpClient){}


  ngOnInit() {
    
  }

}

interface bici{
  id:number,
  name:string,
  listPrice:number
}
