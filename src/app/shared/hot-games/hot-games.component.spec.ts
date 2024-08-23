import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotGamesComponent } from './hot-games.component';

describe('HotGamesComponent', () => {
  let component: HotGamesComponent;
  let fixture: ComponentFixture<HotGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HotGamesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
