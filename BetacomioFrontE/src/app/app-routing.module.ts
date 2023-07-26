import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './Home/home/home.component';
import { AboutUsComponent } from './About_us/about-us/about-us.component';
import { CatalogueComponent } from './Catalogue/catalogue/catalogue.component';
import { LoginComponent } from './Login/login/login.component';
import { SignupComponent } from './Signup/signup/signup.component';
<<<<<<< HEAD
import { ContactsComponent } from './Contacts/contacts/contacts.component';
=======
import { CataloguedetailComponent } from './cataloguedetail/cataloguedetail.component';
>>>>>>> c50d627cb5639cff1cecad5b6287eb116c3c1796

const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'About_us',component:AboutUsComponent},
  {path:'Catalogue',component:CatalogueComponent},
  {path:'Login', component:LoginComponent},
  {path:'Signup', component:SignupComponent},
<<<<<<< HEAD
  {path:'Contacts', component:ContactsComponent}
=======
  {path:'CatalogueDetail/:id', component:CataloguedetailComponent}
>>>>>>> c50d627cb5639cff1cecad5b6287eb116c3c1796
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
