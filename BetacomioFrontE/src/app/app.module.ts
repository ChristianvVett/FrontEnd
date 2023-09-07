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
import { FaqComponent } from './Faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RememberPassComponent } from './remember-pass/remember-pass.component';
import { ChangePassComponent } from './change-pass/change-pass.component';





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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
