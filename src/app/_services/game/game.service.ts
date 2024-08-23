import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseProviderService } from '../base-provider.service';
import { GameModelHot } from '../../_model';
@Injectable({
  providedIn: 'root'
})
export class GameService extends BaseProviderService {
  public playMode = new BehaviorSubject<boolean>(false);
  public gameUrl = '/assets/games.json';
  public hopgameUrl = '/assets/hopgames.json';
  constructor(http: HttpClient) {
    super(http);
  }

  getGamesByCategory(categoryId: string): Observable<any> {
    return this.makeGetCall(this.gameUrl).pipe(
      map((res: Array<GameModelHot>) => {
        return res.filter(i => i.categoryId === categoryId);
      })
    );
  }
  getAllHopGames(): Observable<any> {
    return this.makeGetCall(this.gameUrl).pipe(
      map((res: Array<GameModelHot>) => {
        // return res.filter(i => i.categoryId === categoryId);
        return res.slice();
      })
    );
  }
  getGamesById(id: string): Observable<any> {
    return this.makeGetCall(this.gameUrl).pipe(
      map((res: Array<GameModelHot>) => {
        return res.find(i => i.id === id);
      })
    );
  }
  playModeOn(): void {
    this.playMode.next(true);
  }
  playModeOff(): void {
    this.playMode.next(false);
  }
}
