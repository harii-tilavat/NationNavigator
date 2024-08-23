import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Games3dComponent } from './games3d.component';

describe('Games3dComponent', () => {
  let component: Games3dComponent;
  let fixture: ComponentFixture<Games3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Games3dComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Games3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
