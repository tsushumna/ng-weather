import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";
import { BehaviorSubject } from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations$ = new BehaviorSubject<string[]>([]);

  constructor(
    // private weatherService : WeatherService
  ) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations$.next(JSON.parse(locString));
    // for (let loc of this.locations)
    //   this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode : string) {
    let oldLocations = this.locations$.getValue();
    oldLocations.push(zipcode);
    this.locations$.next(oldLocations);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations$.getValue()));
    // this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode : string) {
    let index = this.locations$.getValue().indexOf(zipcode);
    if (index !== -1){
      let oldLocations = this.locations$.getValue();
      oldLocations.splice(index, 1);
      this.locations$.next(oldLocations);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations$.getValue()));
      // localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      // this.weatherService.removeCurrentConditions(zipcode);
    }
  }
}
