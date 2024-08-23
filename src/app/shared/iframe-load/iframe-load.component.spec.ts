import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeLoadComponent } from './iframe-load.component';

describe('IframeLoadComponent', () => {
  let component: IframeLoadComponent;
  let fixture: ComponentFixture<IframeLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IframeLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IframeLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
