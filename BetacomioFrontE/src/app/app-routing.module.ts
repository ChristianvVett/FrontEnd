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
import { FaqComponent } from './faq/faq.component';
import { RememberPassComponent } from './remember-pass/remember-pass.component';
import { ConfirmPassComponent } from './confirm-pass/confirm-pass.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactDetailPageComponent } from './superadmin/contact-detail-page/contact-detail-page.component';

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
  {path:'Paypal',component:PaypalComponent},
  {path:'Faq',component:FaqComponent},
  {path: 'rememberPass' , component:RememberPassComponent},
  {path: 'confirmpassword' , component:ConfirmPassComponent},
  // {path: '404' , component:NotfoundComponent},
  // {path: '**' , redirectTo: '/404'},
  {path: 'ContactDetailPage/:requestId', component:ContactDetailPageComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
