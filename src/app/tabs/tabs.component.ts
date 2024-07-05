import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConditionsAndZip } from 'app/conditions-and-zip.type';
import { LocationService } from 'app/location.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {

    @Input() titles;
    @Output() onTabSelected = new EventEmitter<ConditionsAndZip>();
    tabselected;
    constructor(private locationService : LocationService){}
    
    onTabSelection(location : ConditionsAndZip){
        this.tabselected = location;
        this.onTabSelected.emit(location);
    }
    removeLocation(location : ConditionsAndZip){
        this.locationService.removeLocation(location.zip);
        this.onTabSelection(null);
    }
}
