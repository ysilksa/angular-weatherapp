import { Component } from '@angular/core';

@Component({
  selector: 'app-right-container',
  imports: [],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css'
})
export class RightContainerComponent {
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
