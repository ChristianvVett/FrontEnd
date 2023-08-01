import { Component } from '@angular/core';
import {faFacebook, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
 icon=faFacebook;
 icon2=faInstagram;
 icon3=faLinkedin
}
