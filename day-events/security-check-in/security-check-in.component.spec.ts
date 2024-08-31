import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityCheckInComponent } from './security-check-in.component';

describe('SecurityCheckInComponent', () => {
  let component: SecurityCheckInComponent;
  let fixture: ComponentFixture<SecurityCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityCheckInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
