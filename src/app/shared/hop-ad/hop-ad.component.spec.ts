import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopAdComponent } from './hop-ad.component';

describe('HopAdComponent', () => {
  let component: HopAdComponent;
  let fixture: ComponentFixture<HopAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HopAdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HopAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
