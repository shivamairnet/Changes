import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelsCategorywiseComponent } from './hotels-categorywise.component';

describe('HotelsCategorywiseComponent', () => {
  let component: HotelsCategorywiseComponent;
  let fixture: ComponentFixture<HotelsCategorywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelsCategorywiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelsCategorywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
