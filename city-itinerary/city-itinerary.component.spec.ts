import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityItineraryComponent } from './city-itinerary.component';

describe('CityItineraryComponent', () => {
  let component: CityItineraryComponent;
  let fixture: ComponentFixture<CityItineraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityItineraryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityItineraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
