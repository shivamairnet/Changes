import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-categorywise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight-categorywise.component.html',
  styleUrl: './flight-categorywise.component.css'
})
export class FlightCategorywiseComponent {

   // flights array
   flights = [
    {
      route: 'New Delhi ➔ Milan',
      date: 'Thu, Sept 03, 2024',
      segments: [
        {
          segmentRoute: 'New Delhi ➔ Rome',
          segmentDate: 'Thu, Sept 03, 2024',
          departureTime: '08:45',
          departureCity: 'New Delhi',
          duration: '8h 35m',
          isNonStop: true,
          arrivalTime: '13:50',
          arrivalCity: 'Rome',
          stops: 'Non-stop',
          available: false,
          name: 'Air India',
          flightNumber: 'AI 137',
          logo: 'air-india-logo.png'
        },
        {
          segmentRoute: 'Rome ➔ Milan',
          segmentDate: 'Thu, Sept 03, 2024',
          departureTime: '15:00',
          departureCity: 'Rome - Fiumicino Apt',
          duration: '1h 25m',
          isNonStop: true,
          arrivalTime: '16:25',
          arrivalCity: 'Milan',
          stops: 'Non-stop',
          available: true,
          name: 'Air India',
          flightNumber: 'AI 177',
          logo: 'air-india-logo.png'
        }
      ],
     
      refundable: true,
      class: 'Economy',
      alerts: '+2 Alerts',
      baggageInfo: 'The check-in baggage for flight is 0 Kgs. Check-in baggage will have to be purchased at an additional cost.'
    },
    {
      route: 'Rome ➔ New Delhi',
      date: 'Thu, Sept 12, 2024',
      segments: [
        {
          segmentRoute: 'Rome ➔ Istanbul',
          segmentDate: 'Thu, Sept 12, 2024',
          departureTime: '17:30',
          departureCity: 'Rome - Fiumicino Apt',
          duration: '4h 30m',
          isNonStop: true,
          arrivalTime: '22:00',
          arrivalCity: 'Istanbul',
          stops: 'Non-stop',
          available: false,
          name: 'Indigo',
          flightNumber: '6E 321',
          logo: 'indigo-logo.png'
        },
        {
          segmentRoute: 'Istanbul ➔ New Delhi',
          segmentDate: 'Fri, Sept 13, 2024',
          departureTime: '01:30',
          departureCity: 'Istanbul Airport',
          duration: '8h 20m',
          isNonStop: true,
          arrivalTime: '10:50',
          arrivalCity: 'New Delhi',
          stops: 'Non-stop',
          available: false,
          name: 'Indigo',
          flightNumber: '6E 456',
          logo: 'indigo-logo.png'
        }
      ],
    
      refundable: true,
      class: 'Economy',
      alerts: '+2 Alerts',
      baggageInfo: 'The check-in baggage for flight is 0 Kgs. Check-in baggage will have to be purchased at an additional cost.'
    }
  ];

ngOnInit() {
  console.log(this.flights);
  this.flights.forEach(flight => console.log(flight.segments));
}
}
