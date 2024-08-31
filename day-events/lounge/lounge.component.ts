import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lounge',
  standalone: true,
  imports: [],
  templateUrl: './lounge.component.html',
  styleUrl: './lounge.component.css'
})
export class LoungeComponent {

    @Input() event:string="";

    loungeInfo = {
      type: 'return-lounge',
      availability: 'notChecked',
      event: {
        id: 'lounge-1723447017528',
        start: '2024-09-06T11:00:00.000Z',
        end: '2024-09-06T12:04:00.000Z',
        type: 'return-lounge',
        title: 'Airport Lounge',
        city_id: 127769,
        destination_city_id: 148463,
        related_id: 'commute-1723447017528'
      }
    };

}
