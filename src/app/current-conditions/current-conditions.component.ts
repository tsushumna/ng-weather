import {Component, inject, OnInit, Signal} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';
import { CachingService } from 'app/caching.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit {

  private weatherService = inject(WeatherService);
  private cachingService = inject(CachingService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();
  location;

  ngOnInit(): void {
    this.locationService.locationUpdate.subscribe(locationUpdate => {
        if(locationUpdate){
          if(locationUpdate.action === 'add'){
            if(this.cachingService.checkInCacheAndValidate('cc',locationUpdate.zip) && this.cachingService.getFromCache('cc',locationUpdate.zip)){
              this.weatherService.addCachedDataToCurrentConditions(this.cachingService.getFromCache('cc',locationUpdate.zip));
            } else {
              // this.weatherService.removeCurrentConditions(locationUpdate.zip);
              this.weatherService.addCurrentConditions(locationUpdate.zip);
            }
            
          } else if(locationUpdate.action === 'remove'){
            this.weatherService.removeCurrentConditions(locationUpdate.zip);
          }
          this.locationService.locationUpdate.next(null);
        }
    });
  }
  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
