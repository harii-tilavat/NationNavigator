import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
