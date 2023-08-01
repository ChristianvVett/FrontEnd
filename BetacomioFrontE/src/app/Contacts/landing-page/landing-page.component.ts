import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent  {
  constructor(private router:ActivatedRoute){}

  formData:any={};

  ngOnInit(): void {
    // Recupera i dati del form dai queryParams e convertili nuovamente in un oggetto JSON
    this.router.queryParams.subscribe(params => {
      if (params['formData']) {
        this.formData = JSON.parse(params['formData']);
      }
    });
  }
}

