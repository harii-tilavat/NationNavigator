import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestMicrophoneComponent } from './test-microphone.component';

describe('TestMicrophoneComponent', () => {
  let component: TestMicrophoneComponent;
  let fixture: ComponentFixture<TestMicrophoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestMicrophoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestMicrophoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
