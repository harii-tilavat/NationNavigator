import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdHeadingComponent } from './tmd-heading.component';

describe('TmdHeadingComponent', () => {
  let component: TmdHeadingComponent;
  let fixture: ComponentFixture<TmdHeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmdHeadingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmdHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
