import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightCategorywiseComponent } from './sight-categorywise.component';

describe('SightCategorywiseComponent', () => {
  let component: SightCategorywiseComponent;
  let fixture: ComponentFixture<SightCategorywiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightCategorywiseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SightCategorywiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
