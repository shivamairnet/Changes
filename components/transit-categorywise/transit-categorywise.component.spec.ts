import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitCategorywiseComponent } from './transit-categorywise.component';

describe('TransitCategorywiseComponent', () => {
  let component: TransitCategorywiseComponent;
  let fixture: ComponentFixture<TransitCategorywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransitCategorywiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransitCategorywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
