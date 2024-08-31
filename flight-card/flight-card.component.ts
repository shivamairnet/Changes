
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import { EventsArrayService } from '../../services/eventsArray/events-array.service';
import { availableIcon, notCheckedIcon, notPossibleIcon, unavailableIcon } from '../../shared/availability_status/availability_status';
import { directFlightIcon, multipleStopFlightIcon, oneStopFlightIcon, threeStopFlightIcon, twoStopFlightIcon } from '../../shared/flight_stops/flight_stops';

@Component({
  selector: 'app-flight-card',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css',
})

export class FlightCardComponent implements OnInit, OnChanges {
  @Input() eventUid: string = '';

  flightArr: any[] = [];
  airlinesLogoAndFlightNumberArr = [];

  showTooltip = false;


  flightDetails: {
    layovers :any[]
airlines:any[]
totalDuration:string,
departureCity:string,
departDate :string,
departTime :string,
arrivalCity:string,
arrivalDate:string,
arrivalTime:string,
availabilityStatus:string
  } = {
    layovers :[],
    airlines:[],
    totalDuration : "",
    departureCity:"",
    departDate :"",
    departTime :"",
    arrivalCity:"",
    arrivalDate:"",
    arrivalTime:"",
    availabilityStatus:""
  };

  isTooltipVisible: boolean = false;

  constructor(private eventsService: EventsArrayService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // Check if eventUid has changed
    if (changes['eventUid'] && changes['eventUid'].currentValue) {
        // console.log(changes['eventUid'].currentValue)
      this.getFlightDetails(changes['eventUid'].currentValue);
    }
  }

  getFlightDetails(uid: string) {
  
    this.eventsService.getEventByUid(uid).subscribe({
      next: (data) => {
        this.flightArr = data.events;
      },
      error: (err) => {
        throw new Error('error fetching intercity flights');
      },
    });
    // console.log(this.flightArr)
    this.setFlightDetails();
    // console.log(this.flightDetails)
  }

  setFlightDetails() {
    this.flightDetails.layovers = this.setLayoversArr(this.flightArr);
    this.flightDetails.airlines = this.setAirlinesArr(this.flightArr);
    this.flightDetails.totalDuration = this.setTotalDuration(this.flightArr);
    this.flightDetails.departureCity = this.setDepartureCity(this.flightArr);
    this.flightDetails.departDate = this.setDepartDate(this.flightArr);
    this.flightDetails.departTime = this.setDepartTime(this.flightArr);
    this.flightDetails.arrivalCity = this.setArrivalCity(this.flightArr);
    this.flightDetails.arrivalDate = this.setArrivalDate(this.flightArr);
    this.flightDetails.arrivalTime = this.setArrivalTime(this.flightArr);
    this.flightDetails.availabilityStatus = this.setAvailabilityStatus(this.flightArr);

    // console.log(this.flightDetails)
  }

  setLayoversArr(events: any[]) {
    let arr: any = [];
    const numberOfStops = events.length - 2;

    if (numberOfStops > 0) {
      events.forEach((city, idx) => {
        if (idx % 2 == 0 && idx !== events.length - 1) {
          arr.push({
            airport: this.getTextInsideBrackets(city.event.info.to),
            description: events[idx + 1].event.description,
          });
        }
      });
    }

    return arr;
  }

  setAirlinesArr(
    events: any[],
  ): { name: string; image: string; flightNumber: string }[] {
    const airlines = events
      .filter((e) => e.type === 'flight')
      .map((flightEvent) => ({
        name: flightEvent.event.info.airline,
        image: '', // Leave this empty as per requirement
        flightNumber: flightEvent.event.info.flightNumber,
      }));

    // Remove duplicates based on airline name and flight number
    return airlines.filter(
      (value, index, self) =>
        self.findIndex(
          (v) => v.name === value.name ,
        ) === index,
    );
  }

  setAvailabilityStatus(events:any[]){
    // console.log(events);
    const flight = events.find((e) => e.type === 'flight');
    return flight.availability ==="unavailable" ? "unavailable" : flight.availability ==="available" ? "available" : flight.availability ==="notPossible" ? "notPossible" :"notChecked";
  }

  getImageSrc(): string {
    switch (this.flightDetails.availabilityStatus) {
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

  

  setTotalDuration(events: any[]): string {
    const flightDurations = events
      .filter((e) => e.type === 'flight')
      .map((flightEvent) => flightEvent.event.info.duration);

    const layoverDurations = events
      .filter((e) => e.type === 'waiting') // Assuming 'waiting' represents layovers
      .map((layoverEvent) => {
        // Calculate the duration between the start and end times of the layover
        const start = new Date(layoverEvent.event.start).getTime();
        const end = new Date(layoverEvent.event.end).getTime();
        return (end - start) / 1000 / 60; // Convert milliseconds to minutes
      });

    const totalFlightDuration = flightDurations.reduce(
      (acc, cur) => acc + cur,
      0,
    );
    const totalLayoverDuration = layoverDurations.reduce(
      (acc, cur) => acc + cur,
      0,
    );

    return this.formatDuration(totalFlightDuration + totalLayoverDuration);
  }

  setDepartureCity(events: any[]): string {
    return this.getNameBeforeBrackets(events[0].flightDetails.detail.from);
  }

  setDepartDate(events: any[]): string {
    const firstFlight = events.find((e) => e.type === 'flight');
    const dateString = firstFlight
      ? new Date(firstFlight.event.start).toISOString().split('T')[0]
      : '';

    return this.formatDate(dateString);
  }

  setDepartTime(events: any[]): string {
    const firstFlight = events.find((e) => e.type === 'flight');
    const timeString = firstFlight
      ? new Date(firstFlight.event.start).toISOString().split('T')[1]
      : '';

    return this.formatTime(timeString);
  }

  getNameBeforeBrackets(input: string): string {
    const match = input.match(/^(.+?)\s*\(/);
    return match ? match[1].trim() : input;
  }

  getTextInsideBrackets(input: string): string {
    const match = input.match(/\(([^)]+)\)/);
    return match ? match[1].trim() : '';
  }
  
  formatDate(input: string): string {
    const date = new Date(input);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' }); // Gets the abbreviated month name

    return `${day} ${month}`;
  }

  formatTime(input: string): string {
    // Ensure input is in a valid time format
    if (!input) return 'Invalid input';

    // Create a Date object from the input string
    const date = new Date(`1970-01-01T${input}`); // Use a date part to avoid invalid date issues

    // Extract hours and minutes from the Date object
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');

    // Return formatted time as "HH:MM"
    return `${hours}:${minutes}`;
  }

  formatDuration(totalMinutes: number): string {
    if (totalMinutes < 0) {
      return 'Invalid input'; // Handle negative minutes if necessary
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let result = '';

    if (hours > 0) {
      result += `${hours} hr`;
    }

    if (minutes > 0) {
      if (result) result += ' '; // Add space if there are hours
      result += `${minutes} min`;
    }

    // Handle cases where both hours and minutes are zero
    if (result === '') {
      result = '0 min';
    }

    return result;
  }

  setArrivalCity(events: any[]): string {
    return this.getNameBeforeBrackets(events[0].flightDetails.detail.to);
  }

  setArrivalDate(events: any[]): string {
    const lastFlight = events.filter((e) => e.type === 'flight').pop();
    const dateString = lastFlight
      ? new Date(lastFlight.event.end).toISOString().split('T')[0]
      : '';
    return this.formatDate(dateString);
  }

  setArrivalTime(events: any[]): string {
    const lastFlight = events.filter((e) => e.type === 'flight').pop();
    const timeString = lastFlight
      ? new Date(lastFlight.event.end).toISOString().split('T')[1]
      : '';
    return this.formatTime(timeString);
  }

  getStopsImageUrl(): string {
    const numberOfStops= this.flightDetails.layovers.length;
        switch (numberOfStops ) {
            case 0:
                return directFlightIcon;
            case 1:
                return oneStopFlightIcon;
            case 2:
                return twoStopFlightIcon;
            case 3:
                return threeStopFlightIcon;
            default:
                return multipleStopFlightIcon; // Return an empty string or handle as needed
        }
  }

  getNumberOfFlights():string{
    const numberOfStops= this.flightDetails.layovers.length;
    switch (numberOfStops ) {
        case 0:
            return "Non-Stop";
        case 1:
            return "One Stop";
        case 2:
            return "Two Stops";
        case 3:
            return "Three Stops";
        default:
            return "Multiple Stops"; // Return an empty string or handle as needed
    }
  }

  toggleTooltip() {
    this.isTooltipVisible = !this.isTooltipVisible;
  }
}
