import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leisure',
  standalone: true,
  imports: [],
  templateUrl: './leisure.component.html',
  styleUrl: './leisure.component.css'
})
export class LeisureComponent {

    @Input() event:any={};

}
