import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
import { WeekData } from '../Models/WeekData';
import { TodaysHighlight } from '../Models/TodaysHighlight';
import { Observable } from 'rxjs';
import { EnvironmentalVariables } from '../Environment/EnvironmentVariables';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  // variables filled by API
  locationDetails?: LocationDetails;
  weatherDetails?: WeatherDetails;

  // variables with extracted data from APi 
  temperatureData: TemperatureData = new TemperatureData(); // left container data
  todayData?: TodayData[] = []; // right container data
  weekData?: WeekData[] = [];
  todaysHighlight?: TodaysHighlight = new TodaysHighlight(); // right container data

  // variables for APi calls
  cityName:string = 'New York';
  language:string = 'en-US';
  date:string = '20250812';
  units:string = 'm';
  currentTime:Date = new Date(); 

  // controls the tabs 
  today:boolean = false; 
  week:boolean = true; 

  // controls temperature metric value
  celsius:boolean = true; 
  fahrenheit:boolean = false; 

  constructor(private httpClient: HttpClient) { 
    this.getData();
  }

  getSummaryImage(summary:string):string {
    var baseAddress = "/assets/weather/";
    
    // image names
    var cloudySunny = 'cloudySunny.png';
    var rainSunny = 'rainSunny.png';
    var windy = 'wind.png';
    var sunny = 'sunny.png';
    var rainy = 'rainy.png';

    if (String(summary).includes("Partly Cloudly") || String(summary).includes("P Cloudy")) return baseAddress + cloudySunny;
    else if (String(summary).includes("Partly Rainy") || String(summary).includes("P Rainy")) return baseAddress + rainSunny;
    else if (String(summary).includes("wind")) return baseAddress + windy;
    else if (String(summary).includes("rain")) return baseAddress + rainy;

    return baseAddress + sunny; 
  }

  // method to create chunk for left container data using TemperatureData model
  fillTemperatureDataModel() {
    // set left container data model properties
    this.currentTime = new Date(); 
    this.temperatureData.day = this.weatherDetails['v3-wx-observations-current'].dayOfWeek; 
    this.temperatureData.time = `${String(this.currentTime.getHours()).padStart(2, '0')}:${String(this.currentTime.getMinutes()).padStart(2, '0')}`;
    this.temperatureData.temperature = this.weatherDetails['v3-wx-observations-current'].temperature;
    this.temperatureData.location = `${this.locationDetails.location.city[0]}, ${this.locationDetails.location.country[0]}`;
    this.temperatureData.rainPercent = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.temperatureData.summaryPhrase = this.weatherDetails['v3-wx-observations-current'].wxPhraseLong;
    this.temperatureData.summaryImage = this.getSummaryImage(this.temperatureData.summaryPhrase);
  }

  // method to create chunk for right container data using WeekData model
  fillWeekData() {
    var weekCount = 0; 
    
    while (weekCount < 7) {
      this.weekData.push(new WeekData());
      this.weekData[weekCount].day = this.weatherDetails['v3-wx-forecast-daily-15day'].dayOfWeek[weekCount].slice(0, 3);
      this.weekData[weekCount].tempMax = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMax[weekCount].toString();
      this.weekData[weekCount].tempMin = this.weatherDetails['v3-wx-forecast-daily-15day'].calendarDayTemperatureMin[weekCount].toString(); 
      this.weekData[weekCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-daily-15day'].narrative[weekCount]);
      weekCount++;
    }
  }

  fillTodayData() {
    var todayCount = 0; 

    while(todayCount < 7) {
      this.todayData.push(new TodayData);
      this.todayData[todayCount].time = this.weatherDetails['v3-wx-forecast-hourly-10day'].validTimeLocal[todayCount];
      this.todayData[todayCount].temperature = this.weatherDetails['v3-wx-forecast-hourly-10day'].temperature[todayCount];
      this.todayData[todayCount].summaryImage = this.getSummaryImage(this.weatherDetails['v3-wx-forecast-hourly-10day'].wxPhraseShort[todayCount]);

      todayCount++;
    }
  }

  getTimeFromString(localTime:string):string {
    return localTime.slice(11, 16);
  }

  // method to get today's highlight data from the base variable
  fillTodaysHighlight() {
    this.todaysHighlight.airQuality = this.weatherDetails['v3-wx-globalAirQuality'].globalairquality.airQualityIndex;
    this.todaysHighlight.humidity = this.weatherDetails['v3-wx-observations-current'].precip24Hour;
    this.todaysHighlight.sunrise = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunriseTimeLocal);
    this.todaysHighlight.sunset = this.getTimeFromString(this.weatherDetails['v3-wx-observations-current'].sunsetTimeLocal);
    this.todaysHighlight.uvIndex = this.weatherDetails['v3-wx-observations-current'].uvIndex;
    this.todaysHighlight.visibility = this.weatherDetails['v3-wx-observations-current'].visibility;
    this.todaysHighlight.windStatus = this.weatherDetails['v3-wx-observations-current'].windSpeed;
  }

  celsiusToFaren(degrees:number):number {
    return (degrees * 1.8) + 32;
  }

  farenToCelsius(degrees:number):number {
    return (degrees - 32) * 0.555;
  }

  // prepare data to be used in the UI
  prepareData():void {
    // set left container data model properties
    this.fillTemperatureDataModel();

    // set right container model properties
    this.fillWeekData();
    this.fillTodayData();
    this.fillTodaysHighlight();

    console.log(this.temperatureData);
    console.log(this.weekData);
    console.log(this.todayData);
    console.log(this.todaysHighlight);
  }

  // grab weather details from API
  getLocationDetails(cityName:string, language:string):Observable<LocationDetails>{
    return this.httpClient.get<LocationDetails>(EnvironmentalVariables.weatherApiLocationBaseURL, {
      headers: new HttpHeaders()
      .set(EnvironmentalVariables.xRapidApiKeyName, EnvironmentalVariables.xRapidApiKeyValue)
      .set(EnvironmentalVariables.xRapidApiHostName, EnvironmentalVariables.xRapidApiHostValue),
      params: new HttpParams()
      .set('query', cityName)
      .set('language', language)
    });
  }

  getWeatherReport(date:string, latitude:number, longtitude:number, language:string, units:string):Observable<WeatherDetails>{
    return this.httpClient.get<WeatherDetails>(EnvironmentalVariables.weatherApiForecastBaseURL, {
      headers: new HttpHeaders()
      .set(EnvironmentalVariables.xRapidApiKeyName, EnvironmentalVariables.xRapidApiKeyValue)
      .set(EnvironmentalVariables.xRapidApiHostName, EnvironmentalVariables.xRapidApiHostValue),
      params: new HttpParams()
      .set('date', date)
      .set('latitude', latitude)
      .set('longitude', longtitude)
      .set('language', language)
      .set('units', units)
    });
  }

  getData() {
    var latitude = 0; 
    var longitude = 0; 

    this.getLocationDetails(this.cityName, this.language).subscribe({
      next:(response)=> {
        this.locationDetails = response;
        latitude = this.locationDetails?.location.latitude[0];
        longitude = this.locationDetails?.location.longitude[0]; 
        // console.log(this.locationDetails);

        // call get weather 
        this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
          next:(response)=>{
            this.weatherDetails = response;
            // console.log(this.weatherDetails);

            this.prepareData();
          }
        });
    
      }
    });

    
  }
}

// 40.713 -74.006