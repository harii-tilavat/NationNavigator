import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { BrowserService, TitleService } from './_services';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public title = 'NationNavigator';
  public subscription: Subscription[] = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public cd: ChangeDetectorRef, private titleService: TitleService, private browserService: BrowserService) {
  }
  ngAfterViewInit(): void {
    if (!this.browserService.isBrowser()) return;
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd), map((res) => {

      let child = this.activatedRoute.firstChild as ActivatedRoute;
      while (child.firstChild) {
        child = child.firstChild;
      }
      if (child.snapshot.data['title']) {
        return child.snapshot.data['title'];
      }
      return appTitle
    })).subscribe((res) => {
      this.titleService.setTitle(res);
    }));

    // Meta data for SEO
    this.titleService.setMeta({
      description: "Explore detailed information about countries, including population, area, and dynamic maps. Sort and compare countries easily.",
      keywords: "country information, population, area, maps, compare countries, explore countries, world data, country statistics, capital cities, geographical data, country demographics, country search, global data, region information, continent data, country profiles, international data, country explorer, world facts"
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
