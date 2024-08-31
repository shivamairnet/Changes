import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItineraryComponent } from './date-itinerary.component';

describe('DateItineraryComponent', () => {
  let component: DateItineraryComponent;
  let fixture: ComponentFixture<DateItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateItineraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
