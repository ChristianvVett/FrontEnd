import { Component } from '@angular/core';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.css']
})
export class ScrollUpComponent {
  arrowup=faArrowUp;
  showBackToTopButton: boolean = false;

  OnScroll(){
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
}
