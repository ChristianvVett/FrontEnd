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
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
import { ContactsComponent } from './Contacts/contacts/contacts.component';
=======
import { CataloguedetailComponent } from './cataloguedetail/cataloguedetail.component';

>>>>>>> c50d627cb5639cff1cecad5b6287eb116c3c1796

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    CatalogueComponent,
    LoginComponent,
    SignupComponent,
<<<<<<< HEAD
    ContactsComponent
=======
    CataloguedetailComponent
>>>>>>> c50d627cb5639cff1cecad5b6287eb116c3c1796
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule,
<<<<<<< HEAD
    FormsModule, // Aggiungi FormsModule qui
=======

>>>>>>> c50d627cb5639cff1cecad5b6287eb116c3c1796
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
