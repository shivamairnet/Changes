import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCategorywiseComponent } from './flight-categorywise.component';

describe('FlightCategorywiseComponent', () => {
  let component: FlightCategorywiseComponent;
  let fixture: ComponentFixture<FlightCategorywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightCategorywiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightCategorywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
