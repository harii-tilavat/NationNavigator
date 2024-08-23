import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryListModel, GameModel, GameModelHot } from '../../../_model';
import { GameList, GameListCategory } from '../../../../assets/game';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { AdService } from '../../../_services/adservice/ad.service';
import { GameService } from '../../../_services';
@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrl: './play-game.component.scss'
})
export class PlayGameComponent implements OnInit, OnDestroy, OnChanges {
  public isFullScreen: boolean = true;
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel | GameModelHot> = [] = GameListCategory;
  // public gameName !: string;
  public gameLink !: string;
  public selectedGame !: GameModel | GameModelHot;
  public gamePath = environment.gamePath;
  public gameIframeHtml!: string;
  public gameSuggestionList: Array<GameModel | GameModelHot> = [];
  public isPlayMode = false;
  public isLoading = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private adService: AdService, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameList = GameListCategory.sort((a, b) => a.sortOrder - b.sortOrder);
    // this.gameList = GameListCategory;
    this.activatedRoute.params.subscribe({
      next: (res) => {
        if ((res && res['id'])) {
          this.selectedGame = this.gameList.find(i => i.id === res['id'])!;
          if (!this.selectedGame) {
            this.isLoading = true;
            this.subscription.push(
              this.gameService.getGamesById(res['id']).subscribe((res) => {
                this.selectedGame = res;
                this.loadGameSuggetion(res && res.categoryId);
                this.isLoading = false;
              })
            );
          }
        }
      }, error: (err) => {
        this.isLoading = false;
      }
    });
  }
  private loadGameSuggetion(categoryId: string): void {
    if (!categoryId) return;
    this.subscription.push(
      this.gameService.getGamesByCategory(this.selectedGame && this.selectedGame.categoryId).subscribe((res: Array<GameModelHot>) => {
        if (res && res.length) {
          this.gameSuggestionList = res.slice(1, 3);
          this.gameList = res;
        }
      })
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
