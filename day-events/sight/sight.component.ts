import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatTimeInHoursAndMins } from '../../../utils/formatTimeInHrMin';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sight.component.html',
  styleUrl: './sight.component.css',
})
export class SightComponent implements OnChanges {
  @Input() event: any = {};

  sightDetails: {
    title: string;
    startTime: string;
    endTime: string;
  } = { title: '', startTime: '', endTime: '' };

  isAvailable:boolean=false;
  isTooltipVisible: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['event'] && changes['event'].currentValue) {
      this.setSightDetails(changes['event'].currentValue);
    }
   
  }

  setSightDetails(event: any) {
    const sightObj = event.event;
    this.sightDetails.startTime = this.setStartTime(sightObj);
    this.sightDetails.endTime = this.setEndTime(sightObj);
    this.sightDetails.title = this.setTitle(sightObj);
  }

  setTitle(event: any) {
    return event.title || '';
  }

  setStartTime(event: any) {
    return formatTimeInHoursAndMins(event.start);
  }

  setEndTime(event: any) {
    return formatTimeInHoursAndMins(event.end);
  }

   // New method to check availability
 checkAvailability(event: any): boolean {
  // Implement your logic here, e.g., checking a status field in the event object
  return event.status === 'available';  // Replace with your actual condition
}

// tooltip for edting
toggleTooltip() {
  this.isTooltipVisible = !this.isTooltipVisible;
}

  
}
