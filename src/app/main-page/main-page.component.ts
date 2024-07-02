import { Component, OnInit, Signal, inject } from '@angular/core';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { LocationService } from 'app/location.service';
import { WeatherService } from 'app/weather.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  selectedIndex =0;
  private weatherService = inject(WeatherService);
  private locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  constructor(){
    this.locationService.locations$.subscribe(locationsList => {
      locationsList.forEach(eachLoc => this.weatherService.addCurrentConditions(eachLoc));
      this.selectedIndex = locationsList.length ? 0 : -1;
    });
  }

  removeLoc(location){
    this.locationService.removeLocation(location.zip);
    this.weatherService.removeCurrentConditions(location.zip);
    this.selectedIndex--;
  }

}
