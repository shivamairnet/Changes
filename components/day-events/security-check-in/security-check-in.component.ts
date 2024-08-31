import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-security-check-in',
  standalone: true,
  imports: [],
  templateUrl: './security-check-in.component.html',
  styleUrl: './security-check-in.component.css'
})
export class SecurityCheckInComponent {

    @Input() event:string="";
    
}
