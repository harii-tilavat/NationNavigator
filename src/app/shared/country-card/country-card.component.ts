import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryModel } from '../../_model';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss'
})
export class CountryCardComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  @Input() countryInfo!: CountryModel;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
