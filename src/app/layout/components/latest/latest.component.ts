import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameList } from '../../../../assets/game';
import { GameModel } from '../../../_model';
@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrl: './latest.component.scss'
})
export class LatestComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = [];
  constructor() { }

  ngOnInit(): void {
    this.gameList = (GameList.find(i => i.title === 'latest')?.gameList as Array<GameModel>);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
