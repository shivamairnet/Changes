import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { hotelAvailabilityRes } from './../../services/hotel-availability-info-room/infoRoomsDummy';
import { Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateItineraryComponent } from "../date-itinerary/date-itinerary.component";
import { CityItineraryService } from '../../services/city-itinerary-service/city-itinerary.service';
// import { CommonModule } from '@angular/common';
import { HotelInfoRoomsComponent } from "../hotel-info-rooms/hotel-info-rooms.component";
import { HotelAvailabiltyInfoRoomService } from '../../services/hotel-availability-info-room/hotel-availabilty-info-room.service';
import { availableIcon, notCheckedIcon, notPossibleIcon, unavailableIcon } from '../../shared/availability_status/availability_status';


@Component({
  selector: 'app-hotels-categorywise',
  standalone: true,
  imports: [DateItineraryComponent,CommonModule,HotelInfoRoomsComponent],
  templateUrl: './hotels-categorywise.component.html',
  styleUrl: './hotels-categorywise.component.css'
})
export class HotelsCategorywiseComponent {

  @Input() eventUid:string="";

  // showInfoRoomsDialog:boolean=false;
  isHotelAvailable:boolean=true;
  
  cityItineraryDetails:{
    cityEvents:any[],
    hotel:any
     }={cityEvents:[],hotel:{}}

  hotelId:string="";

  constructor(private cityItineraryService:CityItineraryService, private hotelAvailabilityService:HotelAvailabiltyInfoRoomService){}

  ngOnInit(){
      this.setCityItineraryDetails(this.eventUid);
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if eventUid has changed
    if (changes['eventUid'] && changes['eventUid'].currentValue) {
        this.setCityItineraryDetails(changes['eventUid'].currentValue);
    }
    console.log("hello",this.cityItineraryDetails);
}
  
setCityItineraryDetails(uid:string){
    
    this.cityItineraryService.getCityItineraryDetails(uid).subscribe({
        next: (data) => {
          this.cityItineraryDetails = data;
            this.hotelId=this.cityItineraryDetails?.hotel?.event?.id;
        },
        error: (err) => {
          console.error('Error fetching transit details', err);
        }
      });
      console.log("city itinerary details", this.cityItineraryDetails);
}

  toggleAvailability() {
    this.isHotelAvailable = !this.isHotelAvailable;
  }

  getHotelName(){
    return this.cityItineraryDetails.hotel.hotelDetails.detail.hotel_name || "unknown";
  
}

getNumberOFNights(){
    const numberOfNights=this.cityItineraryDetails.cityEvents.length;

    return numberOfNights>1 ? `${numberOfNights} Nights` : `${numberOfNights} Night`
}

getCityName(){
    return this.cityItineraryDetails.hotel.hotelDetails.detail.city_name || "unknown";
}

}
