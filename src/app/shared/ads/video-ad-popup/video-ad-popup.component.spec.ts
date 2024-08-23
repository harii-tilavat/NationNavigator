import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdPopupComponent } from './video-ad-popup.component';

describe('VideoAdPopupComponent', () => {
  let component: VideoAdPopupComponent;
  let fixture: ComponentFixture<VideoAdPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoAdPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoAdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
