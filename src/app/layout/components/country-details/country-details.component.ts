import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryModel } from '../../../_model';
import { ActivatedRoute } from '@angular/router';
import { BrowserService, CountryService } from '../../../_services';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public countryInfo!: CountryModel;
  public isLoading = false;
  constructor(private activatedRoute: ActivatedRoute, private countryService: CountryService, private browserService: BrowserService) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    this.isLoading = true;
    this.subscription.push(
      this.activatedRoute.params.subscribe((res) => {
        if (res && res['code']) {
          this.getCountryDetailsByCode(res['code']);
          console.log("RES : ", res);
        }
      })
    );
  }
  getCountryDetailsByCode(code: string): void {
    this.subscription.push(
      this.countryService.getCountryDetailsByCode(code).subscribe({
        next: (res: Array<CountryModel>) => {
          console.log(res);
          if (res && res.length) {
            this.countryInfo = res[0];
            this.isLoading = false;
          }
        }, error: (err) => {
          console.log("ERROR : ", err);
          this.isLoading = false;
        }
      })
    );
  }
  goToBack(): void {
    history && history.back();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
