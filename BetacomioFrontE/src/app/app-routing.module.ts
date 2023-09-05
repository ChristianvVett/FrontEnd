import { NgModule } from '@angular/core';

import {RouterModule,Routes} from '@angular/router'
import { HomeComponent } from './Home/home/home.component';
import { AboutUsComponent } from './About_us/about-us/about-us.component';
import { CatalogueComponent } from './Catalogue/catalogue/catalogue.component';
import { LoginComponent } from './Login/login/login.component';
import { SignupComponent } from './Signup/signup/signup.component';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CataloguedtComponent } from './CatalogueDt/cataloguedt/cataloguedt.component';
import { LandingPageComponent } from './Contacts/landing-page/landing-page.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { MyprofileComponent } from './MyProfile/myprofile/myprofile.component';
import { PaypalComponent } from './Payment/paypal/paypal.component';


const routes:Routes=[
  {path:'',component:HomeComponent},
  {path:'About_us',component:AboutUsComponent},
  {path:'Catalogue',component:CatalogueComponent},
  {path:'Login', component:LoginComponent},
  {path:'Signup', component:SignupComponent},
  {path:'Contacts', component:ContactsComponent},
  {path:'LandingPage', component:LandingPageComponent},
  {path:'Cataloguedt/:id', component:CataloguedtComponent},
  {path:'superadmin', component:SuperadminComponent },
  {path: 'product/:productname', component:CataloguedtComponent},
  {path: 'MyProfile', component:MyprofileComponent},
  {path:'Paypal',component:PaypalComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
