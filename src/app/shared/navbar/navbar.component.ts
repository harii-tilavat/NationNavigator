import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { GameService, SidebarService } from '../../_services';
import { GameList, GameListCategory } from '../../../assets/game';
import { environment } from '../../../environments/environment';
import { GameModel } from '../../_model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isSidebarOpen = true;
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = [];
  public displayGameList: Array<GameModel> = [];
  public focusMode = false;
  public query !: string;
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl(null, []),
  });
  constructor(private sidebarService: SidebarService, private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    this.gameList = GameListCategory.sort((a, b) => {
      return a.title < b.title ? -1 : 1
    });
    // this.displayGameList = this.gameList.slice(0, 6);
    this.subscription.push(this.sidebarService.isSidebarOpen.subscribe({
      next: (res: boolean) => {
        this.isSidebarOpen = res;
      }
    }));
    // .pipe(debounceTime(800)) -> after valueChanges ;
    this.subscription.push(this.searchForm.controls['query'].valueChanges.subscribe({
      next: (res: string) => {
        this.query = res;
        this.displayGameList = this.gameList.filter(i => i.title.toLowerCase().startsWith(this.query));
      }
    }));
  }
  goToGame(name: string) {
    this.gameService.playMode.next(false);
    this.router.navigate(['/game', name]);
    this.resetForm();
  }
  goToHome(): void {
    this.router.navigate(['/home']);
    this.sidebarService.activateMenu(-1);
  }
  sidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.isSidebarOpen.next(this.isSidebarOpen);
  }
  resetForm() {
    this.searchForm.reset();
    this.displayGameList = [];
    this.query = '';
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
