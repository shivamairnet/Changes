import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SightComponent } from "../day-events/sight/sight.component";
import { LeisureComponent } from '../day-events/leisure/leisure.component';
import { formatDateInDayMonth } from '../../utils/formatDateInDayMonth';
import { CommuteComponent } from '../day-events/commute/commute.component';
import { LoungeComponent } from "../day-events/lounge/lounge.component";
import { SecurityCheckInComponent } from "../day-events/security-check-in/security-check-in.component";

@Component({
  selector: 'app-date-itinerary',
  standalone: true,
  imports: [CommonModule, SightComponent, CommuteComponent, LeisureComponent, LoungeComponent, SecurityCheckInComponent],
  templateUrl: './date-itinerary.component.html',
  styleUrl: './date-itinerary.component.css'
})
export class DateItineraryComponent implements OnChanges {

    @Input() dateEventsObj:any={}

    date:string="";

    ngOnChanges(changes: SimpleChanges): void {
       
        if (changes['dateEventsObj'] && changes['dateEventsObj'].currentValue) {
              this.setDate(changes['dateEventsObj'].currentValue);
        }
      
       
    }

    setDate(dateObj:any){
      this.date=formatDateInDayMonth(dateObj.date)
    }

    isCommuteEvent(event:any):boolean{
        return event.type==="commute-sight-hotel" || event.type==="commute-hotel-sight" || event.type==="commute-hotel-airport" || event.type==="commute-airport-hotel"
    }

    isLeisureEvent(event:any):boolean{
        return event.type==="leisure"
    }

    isLoungeEvent(event:any):boolean{ 
        return event.type==="return-lounge" || event.type==="incoming-lounge"
    }

    isCheckInEvent(event:any):boolean{
        return event.type==="check-in";
    }

    isSightEvent(event:any){
        return event.type==="sight"
    }
}
