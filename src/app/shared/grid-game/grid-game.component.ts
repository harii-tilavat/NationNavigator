import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameType } from '../../_enum';
import { AdConfigModel, GameModel, GameModelHot } from '../../_model';
import { Router } from '@angular/router';
import { AdService, GameService } from '../../_services';
import { NgbModal } from '../ng-modal';
import { FooterComponent } from '../footer/footer.component';
import { IframeLoadComponent } from '../iframe-load/iframe-load.component';
import { GameList, GameListCategory, GameListHot } from '../../../assets/game';
import { VideoAdPopupComponent } from '../ads/video-ad-popup/video-ad-popup.component';
@Component({
  selector: 'app-grid-game',
  templateUrl: './grid-game.component.html',
  styleUrl: './grid-game.component.scss'
})
export class GridGameComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() gameType: string = GameType.NORMAL;
  @Input() gameCategory!: string;
  @Input() routing!: string | Array<string>;
  @Input() gameList: Array<GameModel | GameModelHot> = [];
  @Input() isAdShow = true;
  public subscription: Subscription[] = [];
  public adsAfterGame: number = 12;
  public isMonetizedGame!: string;
  public displayGameList: Array<GameModel | GameModelHot> = [];
  public adNumber1 = 3;
  public adNumber2 = 8;
  // public slotArray: Array<string> = ['/21857590943,23113948477/pss_hopgame.in/970x250', '/21857590943,23113948477/pss_hopgame.in/728x90'];
  public slotArray: Array<string> = ['/23183718078/hopads_small_banner', '/23183718078/bannerads_970x250_320x100'];
  // public adConfig: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '7255209184',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true,
  // };
  public isAdFinished = false;
  public adIdArray: Array<number> = [];
  public promisArray: Array<any> = [];
  public isGameInit = false;
  constructor(private router: Router, private gameService: GameService, private modalService: NgbModal, private adService: AdService) {
    // this.adNumber1 = Math.floor((Math.random() * 6) + 1);
    // this.adNumber2 = Math.floor((Math.random() * 6) + 6);
  }

  ngOnInit(): void {
    this.initializeGameList();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['gameList']) {
      this.initializeGameList();
    }
  }
  ngAfterViewInit(): void {
    this.loadAdCodes();
  }
  async playGame(id: string): Promise<void> {
    try {
      this.isAdFinished = await this.adService.showAdPopup(6);
      if (this.isAdFinished) {
        this.router.navigate(['/game', id]);
        this.scrollTop();
        this.gameService.playModeOff();
      }
    } catch (error) {
      console.log("Popup ERROR => ", error);
    }
  }

  loadAdCodes(): void {
    try {
      Promise.all(this.promisArray).then(() => { }).catch(() => { });
    } catch (error) {
      console.log("Load code error ", error);
    }
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  getNumber(number: number) {
    // console.log("NUMBER : ", number);
    return Math.ceil(number);
  }
  private initializeGameList(): void {
    this.displayGameList = [...this.gameList];
    if (this.displayGameList.length <= 12 || this.gameType === GameType.LATEST || this.isGameInit) {
      return;
    }
    this.cleanupAd();
    this.promisArray = [];
    this.adIdArray = Array.from({ length: Math.floor(this.displayGameList.length / this.adsAfterGame) }, (_, index) => index + 1); // Create an array of 1 to (N / 12)
    let slot = this.slotArray[0];
    this.adIdArray.forEach((adNumber, index) => {
      slot = this.slotArray[index % this.slotArray.length];
      // this.promisArray.push(this.adService.registerAds('/23183718078/Hop_Bannersmart', [[750, 100], [300, 100], [320, 100]], `div-gpt-ad-1719902603272-0-${adNumber}`)); Google
      this.promisArray.push(this.adService.registerAds(slot || '/21857590943,23113948477/pss_hopgame.in/970x250', [[750, 100], [300, 100], [320, 100]], `div-gpt-ad-1719902603272-0-${adNumber}`));
    });
    // console.log("Ad ID Array", this.adIdArray);
    // console.log("Promise Array", this.promisArray);
    this.isGameInit = true; // After 1st time initilized it will not execute
  }
  private cleanupAd(): void {
    // Destroy all ads
    this.adIdArray.forEach((adNumber) => {
      this.adService.destroyAdSense(`div-gpt-ad-1719902603272-0-${adNumber}`);
    });
    this.isGameInit = false;

  }
  ngOnDestroy(): void {
    this.cleanupAd();

    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
