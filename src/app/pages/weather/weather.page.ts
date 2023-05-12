import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WeatherAPIService } from 'src/app/weather-api.service';

//getting the data from environment.ts
const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage {
  cityName: any//name of the city
  weatherTemp: any = [];//temperature
  weatherDetails: any;//details from the weather section of the json
  weatherIcon: any;//weather Icon from website
  todayDate = new Date();//date


  constructor(private service: WeatherAPIService, public HttpClient:HttpClient) { 
    this.loadData()
  }  
  
  loadData(){
    //populating the url to make the weatherAPI call
    this.service.GetWeatherData().subscribe((results) => {
      console.log(results);
      this.weatherTemp = results.main;//gets the data from the main part of the json strucuture
      this.cityName = results.name;//get the name from the json
      this.weatherDetails = results.weather[0];
      this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherDetails.icon}@4x.png`;//get the icon of the weather from the website
      //console.log(this.weatherDetails);//line for testing variables to make sure that the correct data is displayed
    })

  }

}
