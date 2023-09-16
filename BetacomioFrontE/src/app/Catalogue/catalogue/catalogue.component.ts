import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/Services/token.service';
import { SafeUrl } from '@angular/platform-browser';
import { GetMethodsService } from 'src/app/Services/get-methods.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
})
export class CatalogueComponent {
  constructor(
    private token: TokenService,
    private getMethods: GetMethodsService

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
      this.viewProductLanguage();
    }
  }


  //Visualizzazione prodotti per utenti non registrati
  viewProductStandard() {
    this.getMethods.getProductStandard().subscribe((response) => {
        this.blist = response;

        for (const el of this.blist) {
          el.sanitizedPhoto = this.getMethods.getProductImage(el.thumbnailPhoto);
        }
      });
  }

  //visualizzazione prodotti per lingua, per utenti loggati
  viewProductLanguage() {
    this.langToken = parseInt(this.getToken.language);
    this.getMethods.getProductLanguage(this.langToken).subscribe((response) => {
        this.blist = response;
        for (const el of this.blist) {
          el.sanitizedPhoto = this.getMethods.getProductImage(el.thumbnailPhoto);
        }
        });
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

}

interface bici {
  productId: Number;
  name: string;
  listPrice: number;
  thumbnailPhoto: Uint8Array;
  sanitizedPhoto: SafeUrl;
}
