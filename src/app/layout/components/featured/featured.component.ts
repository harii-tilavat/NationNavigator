import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameList } from '../../../../assets/game';
import { GameModel } from '../../../_model';
@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = [];
  public selectedGame!: GameModel;
  constructor() { }

  ngOnInit(): void {
    this.gameList = (GameList.find(i => i.title === 'featured')?.gameList as Array<GameModel>);
    this.selectedGame = this.gameList[2];
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
