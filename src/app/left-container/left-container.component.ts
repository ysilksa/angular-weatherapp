import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faLocation, faCloud, faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';

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

  // var for temperature summary 
  faCloud:any = faCloud; 
  faCloudRain:any = faCloudRain;

  constructor(weatherService:WeatherService) {
    
  }
}
