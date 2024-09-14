import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryModel } from '../../../_model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserService, CountryService, TitleService } from '../../../_services';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.scss'
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public countryInfo!: CountryModel;
  public isLoading = false;
  public languages: Array<string> = [];
  public currencies: string[] = []
  constructor(private activatedRoute: ActivatedRoute, private countryService: CountryService, private browserService: BrowserService, private titleService: TitleService, private router: Router) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    this.isLoading = true;
    this.subscription.push(
      this.activatedRoute.params.subscribe((res) => {
        if (res && res['code']) {
          this.getCountryDetailsByCode(res['code']);
        }
      })
    );
  }
  getCountryDetailsByCode(code: string): void {
    this.subscription.push(
      this.countryService.getCountryDetailsByCode(code).subscribe({
        next: (res: Array<CountryModel>) => {
          if (res && res.length) {
            this.countryInfo = res[0];
            this.setTitle(this.countryInfo.name.common);
            this.extractCurrencies(this.countryInfo.currencies);
            this.isLoading = false;
            if (this.countryInfo.languages) {
              for (let item in this.countryInfo.languages) {
                if (this.languages.length <= 3) this.languages.push(this.countryInfo.languages[item]);
              }
            }
          }
        }, error: (err) => {
          console.log("ERROR : ", err);
          this.isLoading = false;
        }
      })
    );
  }
  extractCurrencies(currencies: any): void { // { [key: string]: any }
    for (const code in currencies) {
      if (currencies.hasOwnProperty(code)) {
        this.currencies.push(`${currencies[code].name} (${code}) - ${currencies[code].symbol}`);
      }
    }
  }

  goToBack(): void {
    this.router.navigate(['/']);
  }
  setTitle(title?: string) {
    this.titleService.setTitle('Country Finder - ' + (title || ''));
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
