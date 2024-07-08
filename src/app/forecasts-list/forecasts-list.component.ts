import { Component } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';
import { CachingService } from 'app/caching.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  zipcode: string;
  forecast: Forecast;

  constructor(protected weatherService: WeatherService, route : ActivatedRoute,private cachingService : CachingService) {
    route.params.subscribe(params => {
      this.zipcode = params['zipcode'];
      if(this.cachingService.checkInCacheAndValidate('fc',this.zipcode) && this.cachingService.getFromCache('fc',this.zipcode)){
        this.forecast = this.cachingService.getFromCache('fc',this.zipcode);
      } else {
        weatherService.getForecast(this.zipcode)
        .subscribe(data => {
          data['validUpto'] = new Date(new Date().getTime() + 1000 * CachingService.RESTORE_CACHE_SECONDS);
          this.forecast = data;
          this.cachingService.storeInCache('fc',this.zipcode,this.forecast);
        });
      }
      

      
    });
  }
}
