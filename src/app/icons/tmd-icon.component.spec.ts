import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdIconComponent } from './tmd-icon.component';

describe('NuggetIconComponent', () => {
  let component: TmdIconComponent;
  let fixture: ComponentFixture<TmdIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmdIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TmdIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
