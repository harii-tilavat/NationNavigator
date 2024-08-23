import { AdService } from './../../../_services/adservice/ad.service';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdConfigModel, GameModel, GameModelHot } from '../../../_model';
import { GameList, GameListCategory, GameListHot } from '../../../../assets/game';
import { DOCUMENT } from '@angular/common';
import { AdType } from '../../../_enum';
import { BrowserService } from '../../../_services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit, OnDestroy {
  public gameListMain = GameListCategory;
  public testGame: any[] = [];
  public gameListTrending: Array<GameModel> = [];
  public gameListLatest: Array<GameModel> = [];
  public gameListFeatured: Array<GameModel> = [];
  public gameListKids: Array<GameModel> = [];
  public gameListHot = GameListHot;
  public subscription: Subscription[] = [];
  public devices = ['Webcam', 'Microphone', 'Headphones'];
  public device!: string;
  public currentIndex = 0;
  public intervalId: any;
  // public adConfig: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '7255209184',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // };

  public timerInterval!: ReturnType<typeof setInterval>;

  constructor(public adService: AdService, private browserService: BrowserService, private router: Router) { }

  ngOnInit(): void {
    this.gameListTrending = this.gameListMain.sort((a, b) => a.sortOrder - b.sortOrder).slice(0, 12);
    this.gameListFeatured = this.gameListMain.sort((a, b) => a.sortOrder - b.sortOrder).slice(12, 24);
    this.gameListLatest = this.gameListMain.sort((a, b) => a.sortOrder - b.sortOrder).slice(24, 36);
    this.gameListHot = this.gameListHot.slice(0, 12);
    this.gameListKids = this.gameListMain.sort((a, b) => a.sortOrder - b.sortOrder).filter(i => i.categoryId === '11').slice(24, 36);
    this.device = this.devices[this.currentIndex];
    if (this.browserService.isBrowser()) {
      this.intervalId = setInterval(() => {
        this.currentIndex++;
        this.device = this.devices[this.currentIndex % this.devices.length];
      }, 2000);
    }
  }
  ngAfterViewInit(): void {
    this.loadAdCodes();
  }

  loadAdCodes(): void {

    try {
      Promise.all(
        [
          this.adService.registerAds('/23183718078/bannerads_970x250_320x100', [[970, 250], [320, 100]], 'div-gpt-ad-1719924585166-0', AdType.BANNER_BIG), // Google
          this.adService.registerAds('/23183718078/Hop_Bannersmart', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0', AdType.BANNER_BIG), // Google
          this.adService.registerAds('/23183718078/hop_hom_banner_1', [[320, 100], [970, 250]], 'div-gpt-ad-1720012442388-0', AdType.BANNER_BIG), // Google

          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/728x90', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0'), // Profit-sense
          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/970x250', [[970, 250], [320, 100]], 'div-gpt-ad-1719924585166-0'), // Profit-sense
          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/300x600', [[320, 100], [970, 250]], 'div-gpt-ad-1720012442388-0'), // Profit-sense

        ]).then(() => { }).catch(() => { });

    } catch (error) {
      // console.log("Load code error ", error);
    }
  }
  startTesting(event:Event): void {
    this.router.navigate(['/webcam']);
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1719902603272-0');
    this.adService.destroyAdSense('div-gpt-ad-1719924585166-0');
    this.adService.destroyAdSense('div-gpt-ad-1720012442388-0');
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }

}

