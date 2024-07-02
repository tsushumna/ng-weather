import {Component, inject, Input, OnChanges, OnInit, Signal, SimpleChanges} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {ConditionsAndZip} from '../conditions-and-zip.type';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit,OnChanges {

  @Input()
  set selectedLocation(value) {
     
  }
  public location;

  private weatherService = inject(WeatherService);
  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

  ngOnInit(): void {
      // this.locationService.locations$.subscribe(locationsList => {
      //    locationsList.forEach(eachLocation => {
      //       this.weatherService.addCurrentConditions(eachLocation);
      //    })
      // });
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes.selectedLocation.currentValue !== changes.selectedLocation.previousValue) {
        setTimeout(() => {
          const zip = this.locationService.locations$.getValue()[changes.selectedLocation.currentValue];
          const list = this.currentConditionsByZip();
          const index = list.findIndex(each => each.zip === zip);
         if(index > -1){
            this.location = list[index];
            
          }
        }, 500);
       
      }
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }
}
