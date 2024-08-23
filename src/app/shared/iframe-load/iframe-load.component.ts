import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameListCategory } from '../../../assets/game';
import { AdConfigModel, GameModel, GameModelHot } from '../../_model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserService, FullScreenService } from '../../_services';
import { AdService } from '../../_services/adservice/ad.service';
import { GameService } from '../../_services';
import { isPlatformBrowser } from '@angular/common';
import { AdType } from '../../_enum';
// declare function initAds(): any;

declare function t(arg: string): Promise<void>;
declare function a(arg: string): void;


@Component({
  selector: 'app-iframe-load',
  templateUrl: './iframe-load.component.html',
  styleUrl: './iframe-load.component.scss'
})
export class IframeLoadComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() gameSuggestionList: Array<GameModel | GameModelHot> = [];
  @Input() gameCategory!: string;
  @Input() selectedGame !: GameModel | GameModelHot;
  @Input() isLoading = false;
  public isDevelopment = true;
  public subscription: Subscription[] = [];
  public displayGameList: Array<GameModel | GameModelHot> = [];
  public gameList: Array<GameModel> = [] = GameListCategory;
  public isFullScreen = false;
  public isPlayMode = false;
  // public adConfigSquare: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '3112444887',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // }
  // public adConfigSmallBanner: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '2998617014',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // }
  // public adConfigBigBanner: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '7255209184',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // };

  constructor(private router: Router, private fullScreenService: FullScreenService, private gameService: GameService, public adService: AdService, private browserService: BrowserService) { }

  ngOnInit(): void {
    this.subscription.push(this.gameService.playMode.subscribe({
      next: (res: boolean) => {
        this.isPlayMode = res;
      }
    }));
    this.subscription.push(this.fullScreenService.fullscreenChange.subscribe((res) => {
      this.isFullScreen = res;
    }));
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.selectedGame) {
      this.selectedGame = this.gameSuggestionList[0];
    }
    this.displayGameList = this.gameSuggestionList && this.gameSuggestionList.length ? this.gameSuggestionList.slice(0, 2) : this.gameList.slice(0, 2);
    // ---------------- When user exit from the full screen play mode off ------------------------
    // this.subscription.push(this.fullScreenService.fullscreenChange.subscribe((res: boolean) => {
    //   this.isPlayMode = res;
    // }));
  }
  ngAfterViewInit(): void {
    this.loadAdCodes();
  }

  loadAdCodes(): void {
    try {
      Promise.all(
        [
          this.adService.registerAds('/23183718078/Hop_Bannersmart', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0', AdType.BANNER_BIG),  //Google
          this.adService.registerAds('/23183718078/HopBanner_320x480', [320, 480], 'div-gpt-ad-1719924717785-0', AdType.SQUARE), // Google
          this.adService.registerAds('/23183718078/bannerads_970x250_320x100', [[970, 250], [320, 100]], 'div-gpt-ad-1719924585166-0', AdType.BANNER_BIG), //Google

          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/970x250', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0', AdType.BANNER_BIG),
          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/300x250', [320, 250], 'div-gpt-ad-1719924717785-0', AdType.SQUARE),
          // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/728x90', [[970, 250], [320, 100]], 'div-gpt-ad-1719924585166-0', AdType.BANNER_BIG),
        ]
      ).then(() => { }).catch(() => { });

    } catch (error) {
      console.log('Error loading ad codes:', error);
    }
  }
  async playGame() {
    this.gameService.playMode.next(true);
  }
  playNow(name: string) {
    this.gameService.playMode.next(false);
    this.router.navigate(['/game', name]);
  }
  requestFullScreen() {
    if (!this.isFullScreen) {
      let element = document.getElementById('fullscreen-element');
      if (element) {
        this.fullScreenService.requestToFullScreen(element);
      }
    }
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1719902603272-0');
    this.adService.destroyAdSense('div-gpt-ad-1719924717785-0');
    this.adService.destroyAdSense('div-gpt-ad-1719924585166-0');
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
    // this.adService.destroyAdSense('div-gpt-ad-300-250');
  }
}
