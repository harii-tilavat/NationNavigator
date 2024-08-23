import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdConfigModel, GameModel } from '../../../_model';
import { GameList } from '../../../../assets/game';
import { AdService } from '../../../_services';
import { AdType } from '../../../_enum';
@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrl: './recent.component.scss'
})
export class RecentComponent implements OnInit, AfterViewInit, OnDestroy {
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = [];
  // public adConfig: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '7255209184',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // };

  constructor(private adService: AdService) { }

  ngOnInit(): void {
    this.gameList = (GameList.find(i => i.title === 'recent')?.gameList as Array<GameModel>);
  }

  ngAfterViewInit(): void {
    this.loadAdCodes();
  }

  loadAdCodes(): void {
    try {
      this.adService.registerAds('/23183718078/Hop_Bannersmart', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0', AdType.BANNER_BIG).then(() => { }).catch(() => { }); // Google
      // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/300x250',  [[750, 100]], 'hopgame-in-profitsence-300x250-01').then(() => { }).catch(() => { });
    } catch (error) {
      console.log('Error loading ad codes:', error);
    }
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1719902603272-0'); // Google
    // this.adService.destroyAdSense('hopgame-in-profitsence-300x250-01');
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
