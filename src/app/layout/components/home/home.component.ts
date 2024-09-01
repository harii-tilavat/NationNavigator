// import { AdService } from './../../../_services/adservice/ad.service';
// import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Inject, EventEmitter, Output } from '@angular/core';
// import { BrowserService, CountryService } from '../../../_services';
// import { Router } from '@angular/router';
// import { FormGroup, FormControl } from '@angular/forms';
// import { debounceTime, distinctUntilChanged, Subscription, tap } from 'rxjs';
// import { CountryModel } from '../../../_model';


// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.scss'
// })
// export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
//   public searchForm: FormGroup = new FormGroup({ query: new FormControl('', []) });
//   public timerInterval!: ReturnType<typeof setInterval>;
//   public subscription: Array<Subscription> = [];
//   public isLoading = true;
//   public countryList: Array<CountryModel> = [];
//   public displayCountryList: Array<CountryModel> = [];
//   constructor(public adService: AdService, private browserService: BrowserService, private router: Router, private countryService: CountryService) { }

//   ngOnInit(): void {
//     if (!this.browserService.isBrowser()) return;
//     this.subscription.push(this.searchForm.controls['query'].valueChanges.pipe(tap(() => this.isLoading = true), debounceTime(800), distinctUntilChanged())
//       .subscribe(query => {
//         if (!query) {
//           this.displayCountryList = [...this.countryList];
//           this.isLoading = false;
//           return;
//         }
//         this.fetchCountryByName(query);
//         console.log("QUERY ", query);
//       }));
//     this.fetchAllCountryList();
//   }
//   ngAfterViewInit(): void { }

//   fetchAllCountryList(): void {
//     this.subscription.push(
//       this.countryService.getAllCountry().subscribe({
//         next: (res: Array<CountryModel>) => {
//           console.log("Response : ", res);
//           this.countryList = res;
//           this.displayCountryList = [...this.countryList];
//           this.isLoading = false;
//         }, error: () => {
//           console.log("Error in fetching country.");
//           this.isLoading = false;
//         }
//       })
//     );
//   }
//   fetchCountryByName(name: string): void {
//     this.subscription.push(
//       this.countryService.getCountryByName(name).subscribe({
//         next: (res: Array<CountryModel>) => {
//           console.log("Response : ", res);
//           this.displayCountryList = res;
//           this.isLoading = false;
//         }, error: () => {
//           console.log("Error in fetching country.");
//           this.isLoading = false;
//         }
//       })
//     );
//   }
//   ngOnDestroy(): void {
//     this.subscription.forEach(i => i.unsubscribe);
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { tap, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdService } from '../../../_services/adservice/ad.service';
import { BrowserService, CountryService } from '../../../_services';
import { Router } from '@angular/router';
import { CountryModel } from '../../../_model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl('')
  });
  public subscription: Array<Subscription> = [];
  public isLoading = true;
  public sortBy: string = "";
  public sortOptions = [
    { value: 'NAME', label: 'Name' },
    { value: 'POPULATION', label: 'Population' },
    { value: 'AREA', label: 'Area' },
  ];
  public countryList: Array<CountryModel> = [];
  public displayCountryList: Array<CountryModel> = [];
  public sortOrder: 'ASC' | 'DESC' = 'ASC';
  constructor(public adService: AdService, private browserService: BrowserService, private router: Router, private countryService: CountryService) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    this.subscription.push(this.searchForm.controls['query'].valueChanges.pipe(
      tap(() => this.isLoading = true),
      debounceTime(500),
      distinctUntilChanged(),
      tap(query => {
        if (!query) {
          this.displayCountryList = [...this.countryList];
          this.isLoading = false;
          return;
        }
        this.fetchCountryByName(query);
      }),
      catchError(error => {
        console.log("Error in search query:", error);
        this.isLoading = false;
        return of([]);
      })
    ).subscribe());

    this.fetchAllCountryList();
  }

  fetchAllCountryList(): void {
    this.subscription.push(
      this.countryService.getAllCountry().pipe(
        tap(() => this.isLoading = true),
        tap(res => {
          // console.log("Response : ", res);
          this.countryList = res;
          this.displayCountryList = [...this.countryList];
        }),
        tap(() => this.isLoading = false),
        catchError(error => {
          console.log("Error in fetching country.", error);
          this.isLoading = false;
          return of([]);
        })
      ).subscribe()
    );
  }
  onChangeSortBy(sortBy: string): void {
    const sortStrategies: { [key: string]: (a: any, b: any) => number } = {
      NAME: (a, b) => (a?.name?.common || '').localeCompare(b?.name?.common || ''),
      POPULATION: (a, b) => (a?.population || 0) - (b?.population || 0),
      AREA: (a, b) => (a?.area || 0) - (b?.area || 0),
    };

    if (sortStrategies[sortBy]) {
      this.displayCountryList.sort((a, b) =>
        this.sortOrder === 'ASC' ? sortStrategies[sortBy](a, b) : sortStrategies[sortBy](b, a)
      );
    } else {
      this.displayCountryList = [...this.countryList];
    }
  }
  fetchCountryByName(name: string): void {
    this.subscription.push(
      this.countryService.getCountryByName(name).pipe(
        tap(() => this.isLoading = true),
        tap(res => {
          this.displayCountryList = res;
        }),
        tap(() => this.isLoading = false),
        catchError(error => {
          console.log("Error in fetching country by name.", error);
          this.isLoading = false;
          return of([]);
        })
      ).subscribe());
  }
  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
    this.onChangeSortBy(this.sortBy); // Reapply sorting with new order
  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
