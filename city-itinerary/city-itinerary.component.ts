import { hotelAvailabilityRes } from './../../services/hotel-availability-info-room/infoRoomsDummy';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateItineraryComponent } from "../date-itinerary/date-itinerary.component";
import { CityItineraryService } from '../../services/city-itinerary-service/city-itinerary.service';
import { CommonModule } from '@angular/common';
import { HotelInfoRoomsComponent } from "../hotel-info-rooms/hotel-info-rooms.component";
import { HotelAvailabiltyInfoRoomService } from '../../services/hotel-availability-info-room/hotel-availabilty-info-room.service';
import { availableIcon, notCheckedIcon, notPossibleIcon, unavailableIcon } from '../../shared/availability_status/availability_status';

@Component({
  selector: 'app-city-itinerary',
  standalone: true,
  imports: [DateItineraryComponent, CommonModule, HotelInfoRoomsComponent],
  templateUrl: './city-itinerary.component.html',
  styleUrl: './city-itinerary.component.css'
})
export class CityItineraryComponent implements OnChanges,OnInit {

    @Input() eventUid:string="";

    showInfoRoomsDialog:boolean=false;
    isAvailable:boolean=true;
    isTooltipVisible: boolean = false;


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
        // console.log(this.cityItineraryDetails);
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

    getImageSrc(): string {
        switch (this.cityItineraryDetails.hotel.availability) {
            case 'available':
                return availableIcon;
            case 'unavailable':
                return unavailableIcon;
            case 'unPossible':
                return notPossibleIcon;
            case 'notChecked':
                return notCheckedIcon;
            default:
                return notCheckedIcon; // Return an empty string or handle as needed
        }
      }
    
    async handleHotelCheckAvailability(): Promise<void> {
        
        this.showInfoRoomsDialog = true;

        // console.log(hotelAvailabilityRes);
    }
    
    closeDialog(): void {
        this.showInfoRoomsDialog = false;
    }

           // New method to check availability
 checkAvailability(event: any): boolean {
    // Implement your logic here, e.g., checking a status field in the event object
    return event.status === 'available';  // Replace with your actual condition
  }

  toggleTooltip() {
    this.isTooltipVisible = !this.isTooltipVisible;
  }
}
