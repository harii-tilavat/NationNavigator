import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameModelHot, MenuListModel } from '../../../_model';
import { GameMenuListHot } from '../../../../assets/game';
import { GameType } from '../../../_enum';
import { AdService, GameService } from '../../../_services';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-games3d',
  templateUrl: './games3d.component.html',
  styleUrl: './games3d.component.scss'
})
export class Games3dComponent implements OnInit, OnDestroy, AfterViewInit {
  public gameList: Array<GameModelHot> = [];
  public gameMenuList: Array<MenuListModel> = GameMenuListHot;
  public activeId: string = '5';
  public gameType: string = GameType.HOT;
  public gameCategory!: string;
  public isLoading = false;
  public randomNum1 = 0;
  public randomNum2 = 0;
  public subscription: Subscription[] = [];

  constructor(private gameService: GameService, private adService: AdService) { }
  ngOnInit(): void {
    this.randomNum1 = (Math.random() * 6) + 1;
    this.randomNum2 = (Math.random() * 6) + 6;
    // this.gameList = GameListHot.filter(i => i.categoryId === this.activeId);
    this.navigateTab(this.activeId);
  }
  navigateTab(categoryId: string): void {
    this.activeId = categoryId;
    this.getGameList(this.activeId);
    this.gameCategory = GameMenuListHot.find(i => i.id === this.activeId)?.title + ' games' || 'Hot games';
  }
  getGameList(categoryId: string): void {
    this.isLoading = true;
    this.subscription.push(
      this.gameService.getGamesByCategory(categoryId).subscribe({
        next: (res: Array<GameModelHot>) => {
          this.gameList = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
        }
      })
    );
  }
  ngAfterViewInit(): void {
    this.loadAdCodes();
  }

  loadAdCodes(): void {
    try {
      this.adService.registerAds('/23183718078/Hop_Bannersmart', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0').then(() => { }).catch(() => { }); // Google
      // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/970x250', [[750, 100], [300, 100], [320, 100]], 'div-gpt-ad-1719902603272-0').then(() => { }).catch(() => { });
    } catch (error) {
      // console.log("Load code error ", error);
    }
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1719902603272-0');
    if (this.subscription) {
      this.subscription.forEach((item) => item.unsubscribe());
    }
  }
}
