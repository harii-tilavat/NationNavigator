import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { BrowserService, CookieService, DeviceTypeService, GameService, SidebarService, TitleService } from './_services';
import { AdService } from './_services/adservice/ad.service';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public title = 'HopGame';
  public subscription: Subscription[] = [];
  public isAccepted = false;
  public isPopupShow = false;
  public hopGames: Array<any> = [];
  public adInterval: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, public cd: ChangeDetectorRef, public adService: AdService, private titleService: TitleService, private cookieService: CookieService, @Inject(PLATFORM_ID) private platformId: any, @Inject(DOCUMENT) private document: Document, @Inject('window') public window: Window, private browserService: BrowserService) {
  }
  ngAfterViewInit(): void {
    if (!this.browserService.isBrowser()) return;
    try {
      this.isAccepted = Boolean(this.cookieService.get("USER_AGREEMENT"));
      if (!this.isAccepted) {
        this.isPopupShow = true;
      }

      this.adService.registerInterstitalAd().then(() => { console.log("Register Interstitial!") }).catch(() => { }); // Register Interstitial
      this.adService.setupRefreshInterval().then(() => { console.log("REFRESH START! ") }).catch((err) => { console.log("ERROR IN REFRESH : ", err) });
    } catch (error) {
      console.log("ERROR in refresh : ", error);
    }
  }

  ngOnInit(): void {
    // Set dynamic title by routing
    const appTitle = this.titleService.getTitle();
    this.subscription.push(this.router.events.pipe(filter(event => event instanceof NavigationEnd), map((res) => {
      // Set canonical URL
      let canonicalURL = this.titleService.getCanonicalUrl();
      // console.log("NAVIGATION : ");

      this.titleService.setCanonicalURL(canonicalURL);
      let child = this.activatedRoute.firstChild as ActivatedRoute;
      while (child.firstChild) {
        child = child.firstChild;
      }
      if (child.snapshot.data['title']) {
        return child.snapshot.data['title'];
      }
      return appTitle
    })).subscribe((res) => {
      // console.log('<<<<=======>>>', this.isAccepted);
      this.titleService.setTitle(res);
    }));
    // this.titleService.getMeta();
  }
  isCookieAccepted(): void {
    this.cookieService.set('USER_AGREEMENT', 'true', { path: '/', expires: 30, sameSite: 'Strict' });
    this.isAccepted = Boolean(this.cookieService.get('USER_AGREEMENT'));
    if (!this.isAccepted) {
      this.isPopupShow = false;
    }
    // this.cd.detectChanges();
  }
  ngOnDestroy(): void {
    this.adService.clearRefreshInterval();
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
