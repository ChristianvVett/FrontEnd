import { AfterViewInit, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {
  NgbPaginationFirst,
  NgbPaginationLast,
} from '@ng-bootstrap/ng-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent implements AfterViewInit {
  constructor(
    private http: HttpClient,
    private token: TokenService,
    private sanitizer: DomSanitizer
  ) {}

  rangeValue: number = 0;

  // font awesome icons
  istrue: boolean = true;

  icon = faChevronRight;
  icon2 = faChevronLeft;
  plus = faPlus;
  minus = faMinus;
  cuoricino = faHeart;
  cart = faCartShopping;
  randomImage: number = 10;
  magnifyGlass = faMagnifyingGlass;
  widthplus: number = 0;
  base: number = 300;

  // variables and array
  p: number = 1;
  blist: bici[] = [];
  searchOn: boolean = false;
  searchlist: bici[] = [];
  getToken = JSON.parse(this.token.rew);
  langToken: number;

  ngOnInit() {
    if (this.getToken == null || this.getToken == undefined) {
      console.log('PRODOTTI STANDARD');
      this.viewProductStandard();
    } else {
      console.log('PRODOTTI IN LINGUA');
      this.langToken = parseInt(this.getToken.language);
      this.viewProductLanguage(this.langToken); //lingua dell'utente loggato
    }
  }
  ngAfterViewInit() {
    // this.randomImage = this.incrementRandomImage();
    // console.log(this.randomImage);
  }

  //Visualizzazione prodotti per utenti non registrati
  viewProductStandard() {
    this.http
      .get<any>(`https://localhost:7284/api/ViewAdminProducts`)
      .subscribe((result) => {
        this.blist = result;
        
        for (const el of this.blist) {
          el.sanitizedPhoto = this.getProductImage(el.thumbnailPhoto);
        }

        console.log(this.blist);
      });
  }

  //visualizzazione prodotti per lingua, per utenti loggati
  viewProductLanguage(language: number) {
    this.http
      .get<any>(
        `https://localhost:7284/api/ViewUserProducts/GetUserProductsByLanguage?nationality=${language}`
      )
      .subscribe((result) => {
        this.blist = result;

        for (const el of this.blist) {
          el.sanitizedPhoto = this.getProductImage(el.thumbnailPhoto);
        }
        console.log(this.blist);
      });
  }

  //Metodo che permette di convertire array di byte in immagini
  getProductImage(imageData: Uint8Array) {
    const base64Image = 'data:image/jpeg;base64,' + imageData;
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(base64Image);

    return sanitizedUrl;
  }

  transformPlus() {
    if (this.istrue) {
      this.istrue = false;
      this.widthplus += 600;
    }
  }
  updateValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.rangeValue = parseInt(target.value);
  }

  transformMinus() {
    if (this.istrue == false) {
      this.istrue = true;
      this.widthplus -= 600;

      console.log(`minus${this.istrue}`);
    }
  }
  toggle() {
    this.istrue = !this.istrue;
  }

  arrotondo(num: any) {
    return Math.floor(num);
  }

  increasePage(p: number) {
    this.p++;
  }

  decreasePage(p: number) {
    this.p--;
  }

  serchArticles(input: HTMLInputElement) {
    if (input.value == ' ') {
      this.searchOn = false;
    } else {
      this.searchOn = true;
      var lista = this.blist.filter((elem) =>
        elem.name.toLowerCase().includes(input.value.toLowerCase())
      );
      this.searchlist = lista;
      console.log(this.searchlist);
    }
  }
  searchbyprice(priceinput: HTMLInputElement, input: HTMLInputElement) {
    this.searchOn = true;
    var lista = this.blist.filter(
      (elem) =>
        elem.listPrice < +priceinput.value &&
        elem.name.toLowerCase().includes(input.value.toLowerCase())
    );
    this.searchlist = lista;
    console.log(this.searchlist);
  }

  // incrementRandomImage(): number{

  //   if (this.randomImage > 9 ) {

  //     this.randomImage = Math.floor(Math.random() * 100);

  //   }
  //   return this.randomImage
  // }
}

interface bici {
  productId: Number;
  name: string;
  listPrice: number;
  thumbnailPhoto: Uint8Array;
  sanitizedPhoto: SafeUrl;
}
