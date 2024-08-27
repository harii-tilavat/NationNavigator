import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CountryModel } from '../../../_model';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activatedRoute: ActivatedRoute, private countryService: CountryService, private browserService: BrowserService, private titleService: TitleService) { }

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
            this.setTitle(this.countryInfo.name.common)
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
  goToBack(): void {
    history && history.back();
  }
  setTitle(title?: string) {
    this.titleService.setTitle('Country finder - ' + (title || ''));
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
