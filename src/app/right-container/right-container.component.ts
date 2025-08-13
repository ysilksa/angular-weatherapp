import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp, faThumbsDown, faFaceSmile, faFaceFrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-right-container',
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {
  // faIcons for humidity 
  faThumbsUp:any = faThumbsUp; 
  faThumbsDown:any = faThumbsDown; 
  faFaceSmile:any = faFaceSmile;
  faFaceFrown:any = faFaceFrown;

  // controls the tabs 
  today:boolean = false; 
  week:boolean = true; 

  // controls temperature metric value
  celsius:boolean = true; 
  fahrenheit:boolean = false; 

  // function that controls tab values/states
  onTodayClick() {
    this.today = true; 
    this.week = false; 
  }

  onWeekClick() {
    this.today = false;
    this.week = true; 
  }

  // function that controls temperature metric values
  onCelsiusClick() {
    this.celsius = true;
    this.fahrenheit = false;
  }

  onFahrenheitClick() {
    this.celsius = false; 
    this.fahrenheit = true; 
  }

  

}
