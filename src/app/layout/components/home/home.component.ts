import { AdService } from './../../../_services/adservice/ad.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Inject, EventEmitter, Output } from '@angular/core';
import { BrowserService, CountryService } from '../../../_services';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';
import { CountryModel } from '../../../_model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  public searchForm: FormGroup = new FormGroup({ query: new FormControl('', []) });
  public timerInterval!: ReturnType<typeof setInterval>;
  public subscription: Array<Subscription> = [];
  public isLoading = false;
  public countryList: Array<CountryModel> = [];
  constructor(public adService: AdService, private browserService: BrowserService, private router: Router, private countryService: CountryService) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    this.subscription.push(this.searchForm.controls['query'].valueChanges.pipe(tap(() => this.isLoading = true), debounceTime(800), distinctUntilChanged())
      .subscribe(query => {
        this.isLoading = false;
      }));
    this.fetchAllCountryList();
  }
  ngAfterViewInit(): void { }

  fetchAllCountryList(): void {
    this.subscription.push(
      this.countryService.getAllCountry().subscribe({
        next: (res: Array<CountryModel>) => {
          console.log("Response : ", res);
          this.countryList = res;
        }, error: () => {
          console.log("Error in fetching country.");
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe);
  }

}

