import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameList } from '../../../../assets/game';
import { GameModel } from '../../../_model';
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = [];
  public selectedGame!: GameModel;
  constructor() { }

  ngOnInit(): void {
    this.gameList = (GameList.find(i => i.title === 'trending')?.gameList as Array<GameModel>);
    this.selectedGame = this.gameList[5];
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
