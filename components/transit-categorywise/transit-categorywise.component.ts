import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transit-categorywise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transit-categorywise.component.html',
  styleUrl: './transit-categorywise.component.css'
})
export class TransitCategorywiseComponent {
  
name: string="hello";
  transitType :string;
  isRefundable:boolean=false;
  transits = [
    {
      startLocation: 'Milan Airport',
      endLocation: 'IH Hotel',
      startDate: 'Thu, Sept 03, 2024',
      endDate: 'Sat, Sept 05, 2024',
      // availabilityImage: 'assets/icons/Iconslatestpackage/available.png',
      // transitImage: 'hotel-image.jpg',
      privateTransfer: 'Private Transfer',
      passengers: '2 Passengers in 1 vehicle',
      luggage: '0 Luggage',
      pickupDescription: 'Pickup From Airport',
      dropoffDescription: 'Drop To Hotel',
      vehicleType: 'Sedan'
    },
    {
      startLocation: 'Fae Airport',
      endLocation: 'Mianaz Hotel',
      startDate: 'Thu, July 03, 2024',
      endDate: 'Sat, July 05, 2024',
      // availabilityImage: 'assets/icons/Iconslatestpackage/available.png',
      // transitImage: 'hotel-image.jpg',
      privateTransfer: 'Private Transfer',
      passengers: '2 Passengers in 1 vehicle',
      luggage: '0 Luggage',
      pickupDescription: 'Pickup From Airport',
      dropoffDescription: 'Drop To Hotel',
      vehicleType: 'Sedan'
    },
    
  ];

  constructor() {
    
      // Assign a value to the transit type
      this.transitType = 'car'; // or 'train', 'bus', etc.
    
   }

  ngOnInit(): void {
    console.log(this.transits);

    console.log(this.transitType)
  }
}
