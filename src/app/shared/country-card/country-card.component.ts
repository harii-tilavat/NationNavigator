import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryModel } from '../../_model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.scss'
})
export class CountryCardComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  @Input() countryInfo!: CountryModel;

  constructor(private router: Router) { }

  ngOnInit(): void { }
  goToCountry(code?: string): void {
    this.router.navigate(['/country', code]);
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
