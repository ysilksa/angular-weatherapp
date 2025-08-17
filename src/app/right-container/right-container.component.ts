import { NgIf, NgFor, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown, faFaceSmile, faFaceFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-right-container',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, FontAwesomeModule],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {

  constructor(public weatherService: WeatherService){

  };
  // faIcons for humidity 
  faThumbsUp:any = faThumbsUp; 
  faThumbsDown:any = faThumbsDown; 
  faFaceSmile:any = faFaceSmile;
  faFaceFrown:any = faFaceFrown;

  // // controls the tabs 
  // today:boolean = false; 
  // week:boolean = true; 

  // // controls temperature metric value
  // celsius:boolean = true; 
  // fahrenheit:boolean = false; 

  // function that controls tab values/states
  onTodayClick() {
    this.weatherService.today = true; 
    this.weatherService.week = false; 
  }

  onWeekClick() {
    this.weatherService.today = false;
    this.weatherService.week = true; 
  }

  // function that controls temperature metric values
  onCelsiusClick() {
    this.weatherService.celsius = true;
    this.weatherService.fahrenheit = false;
  }

  onFahrenheitClick() {
    this.weatherService.celsius = false; 
    this.weatherService.fahrenheit = true; 
  }

  

}
