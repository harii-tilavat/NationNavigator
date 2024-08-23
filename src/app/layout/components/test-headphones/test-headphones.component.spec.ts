import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestHeadphonesComponent } from './test-headphones.component';

describe('TestHeadphonesComponent', () => {
  let component: TestHeadphonesComponent;
  let fixture: ComponentFixture<TestHeadphonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHeadphonesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestHeadphonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
