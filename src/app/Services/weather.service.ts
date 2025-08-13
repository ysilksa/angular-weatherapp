import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDetails } from '../Models/LocationDetails';
import { WeatherDetails } from '../Models/WeatherDetails';
import { TemperatureData } from '../Models/TemperatureData';
import { TodayData } from '../Models/TodayData';
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
  temperatureData?: TemperatureData; // left container data
  todaysData?: TodayData; // right container data
  todaysHighlight?: TodaysHighlight; // right container data

  // variables for APi calls
  cityName:string = 'New York';
  language:string = 'en-US';
  date:string = '20250812';
  units:string = 'm';


  constructor(private httpClient: HttpClient) { 
    this.getData();
  }

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
        console.log(this.locationDetails);
    
      }
    });

    this.getWeatherReport(this.date, latitude, longitude, this.language, this.units).subscribe({
      next:(response)=>{
        this.weatherDetails = response;
        console.log(this.weatherDetails);
      }
    });
  }
}

// 40.713 -74.006