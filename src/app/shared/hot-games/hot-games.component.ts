import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AdService, BrowserService, GameService } from '../../_services';
import { Subscription } from 'rxjs';
import { GameModelHot } from '../../_model';
import { ActivatedRoute } from '@angular/router';
import { AdType } from '../../_enum';

@Component({
  selector: 'app-hot-games',
  templateUrl: './hot-games.component.html',
  styleUrl: './hot-games.component.scss'
})
export class HotGamesComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Array<Subscription> = [];
  private gameMonetize = `https://html5.gamemonetize.com/`;
  public selectedGameUrl!: string;
  public isCloseShow = false;
  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute, private adService: AdService, private browserService: BrowserService) { }
  ngOnInit(): void {
    this.getAllHopGames();
    this.subscription.push(
      this.activatedRoute.params.subscribe((res) => {
        if (res && res['id']) {
          this.selectedGameUrl = this.gameMonetize + res['id'];
        }
      })
    );
  }
  ngAfterViewInit(): void {
    this.loadAdCodes();
    if (this.browserService.isBrowser()) {
      setTimeout(() => {
        this.isCloseShow = true;
      }, 5000);
    }
  }
  loadAdCodes(): void {
    try {
      Promise.all(
        [
          this.adService.registerAds('/23183718078/bannerads_970x250_320x100', [[292, 30], [234, 60], [300, 50], [970, 90], [120, 90], [950, 90]], 'google-ad-manager-1', AdType.STICKY), // GAM
          this.adService.registerAds('/23183718078/hopads_small_banner', [[292, 30], [234, 60], [300, 50], [970, 90], [120, 90], [950, 90]], 'google-ad-manager-2', AdType.STICKY), //GAM

          // this.adService.registerAds('/22738518951/gamezop-profitsence/300x250', [[970, 90],[292, 30], [234, 60], [300, 50], [120, 90], [950, 90]], 'google-ad-manager-1', AdType.STICKY), // ProfitSense
          // this.adService.registerAds('/22738518951/gamezop-profitsence/300x250', [[970, 90],[292, 30], [234, 60], [300, 50], [120, 90], [950, 90]], 'google-ad-manager-2', AdType.STICKY), // ProfitSense

          // this.adService.registerAds('/21775744923/example/banner', [[292, 30], [234, 60], [300, 50], [970, 90], [120, 90], [950, 90]], 'google-ad-manager-1', AdType.STICKY), // TESTING
          // this.adService.registerAds('/6499/example/banner', [[292, 30], [234, 60], [300, 50], [970, 90], [120, 90], [950, 90]], 'google-ad-manager-2', AdType.STICKY), // TESTING
        ]
      ).then(() => { }).catch(() => { });

    } catch (error) {
      console.log('Error loading ad codes:', error);
    }
  }
  getAllHopGames(): void {
    // this.subscription.push(this.gameService.getAllHopGames().subscribe({
    //   next: (res: Array<GameModelHot>) => {
    //     // this.hotGames = res;
    //     // console.log("Response : ", this.hotGames);;
    //   }, error: (err) => {
    //     console.log("ERROR --------------------------- ", err);
    //   }
    // }));
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(i => i.unsubscribe());
    }
  }
}
