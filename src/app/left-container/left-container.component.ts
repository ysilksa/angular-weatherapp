import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faLocation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-left-container',
  imports: [FontAwesomeModule],
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css'
})
export class LeftContainerComponent {
  // variables for font awesome icons 
  // vars for left nav bar search icons
  faMagnifyingGlass:any = faMagnifyingGlass;
  faLocation:any = faLocation; 
}
