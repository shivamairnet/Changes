import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sight-categorywise',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sight-categorywise.component.html',
  styleUrl: './sight-categorywise.component.css'
})
export class SightCategorywiseComponent {

  sightSeeings = [
    {
      title: 'Skip the Line Duomo and Rooftop Guided Tour',
      startDate: 'Thu, Sept 03, 2024',
      endDate: 'Sat, Sept 05, 2024',
      imageUrl: 'assets/icons/Iconslatestpackage/available.png',
      description: 'Guided tour of the Duomo and Rooftop',
      duration: '2 Hrs',
      type: 'Sightseeing',
      refundable: true,
      inclusions: [
        'Non-smoking rooms',
        'Free WiFi',
        'Bed And Breakfast',
        'Air Conditioner'
      ],
      exclusions: [
        'Terrace',
        'Bar'
      ]
    }
    // Add more objects if needed
  ];


}
