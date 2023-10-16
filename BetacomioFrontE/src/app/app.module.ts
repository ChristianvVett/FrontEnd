import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Home/home/home.component';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { FooterComponent } from './Footer/footer/footer.component';
import { AboutUsComponent } from './About_us/about-us/about-us.component';
import { CatalogueComponent } from './Catalogue/catalogue/catalogue.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './Login/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './Signup/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LandingPageComponent } from './Contacts/landing-page/landing-page.component';
import { ScrollUpComponent } from './ScrollUp/scroll-up/scroll-up.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { CataloguedtComponent } from './CatalogueDt/cataloguedt/cataloguedt.component';
import { PaypalComponent } from './Payment/paypal/paypal.component';
import { FaqComponent } from './faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RememberPassComponent } from './remember-pass/remember-pass.component';
import { ChangePassComponent } from './change-pass/change-pass.component';
import { MyprofileComponent } from './MyProfile/myprofile/myprofile.component';
import { ConfirmPassComponent } from './confirm-pass/confirm-pass.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { ContactDetailPageComponent } from './superadmin/contact-detail-page/contact-detail-page.component';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider} from '@abacritt/angularx-social-login'; 
 




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    CatalogueComponent,
    CataloguedtComponent,
    LoginComponent,
    SignupComponent,
    ContactsComponent,
    LandingPageComponent,
    ScrollUpComponent,
    SuperadminComponent,
    PaypalComponent,
    FaqComponent,
    RememberPassComponent,
    ChangePassComponent,
    MyprofileComponent,
    ConfirmPassComponent,
    // NotfoundComponent,
    ContactDetailPageComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
    FormsModule,
    CarouselModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '132481416516-43pjat6bglk31hvgrev9q8c7k1e49d2q.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
