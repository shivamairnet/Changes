import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { formatTimeInHoursAndMins } from '../../../utils/formatTimeInHrMin';

@Component({
  selector: 'app-commute',
  standalone: true,
  imports: [],
  templateUrl: './commute.component.html',
  styleUrl: './commute.component.css'
})
export class CommuteComponent implements OnChanges {

    @Input() event:any={};

    commuteDetails:{
        startTime:string,
        endTime:string,
        title:string,
        truncatedTitle:string
    }={
        startTime:"",
        endTime:"",
        title:"",
        truncatedTitle: ''
    }


    isAvailable: boolean = false;  // New property to track availability

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['event'] && changes['event'].currentValue) {
          this.setCommuteDetails(changes['event'].currentValue);
        }
    
    }

    setCommuteDetails(event:any){
        const commuteObj = event.event;
        this.commuteDetails.startTime = formatTimeInHoursAndMins(commuteObj.start);
        this.commuteDetails.endTime = formatTimeInHoursAndMins(commuteObj.end);
        const fullTitle = this.setTitle(commuteObj);
        this.commuteDetails.title = fullTitle;
        this.commuteDetails.truncatedTitle = this.truncateTitle(fullTitle, 7);
    }

    setTitle(event: any) {
        return event.title || '';
    }
    truncateTitle(title: string, wordLimit: number): string {
        const words = title.split(' ');
        if (words.length <= wordLimit) return title;
        return words.slice(0, wordLimit).join(' ') + '...';
      }

 // New method to check availability
 checkAvailability(event: any): boolean {
    // Implement your logic here, e.g., checking a status field in the event object
    return event.status === 'available';  // Replace with your actual condition
  }
}
