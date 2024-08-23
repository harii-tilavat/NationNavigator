import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenuListModel } from '../../_model';
import { AdService, DeviceTypeService, GameService, SidebarService } from '../../_services';
import { GameMenuList, SidebarMenuList } from '../../../assets/game';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  public activeIndex: any = -1;
  public menuList: Array<MenuListModel> = SidebarMenuList;
  public allGameList: Array<MenuListModel> = GameMenuList;
  public subscription: Subscription[] = [];
  public isSidebarOpen: boolean = true;


  constructor(private sidebarService: SidebarService, private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService, private adService: AdService) { }
  ngOnInit(): void {
    this.subscription.push(this.sidebarService.activeMenuIndex.subscribe((res) => {
      this.activeIndex = res;
    }));
  }
  onChangeRouting(route: any): void {
    this.sidebarService.sidebarClose();
    this.activeIndex = -1;
    this.adService.registerInterstitalAd().then(() => { console.log("Register interstitial!") }).catch((err) => { console.log("INTERSTIAL ERROR : ", err) }); // Register Interstitial
    this.router.navigate(route);
  }
  goToGames(categoryId?: string): void {
    this.adService.registerInterstitalAd().then(() => { console.log("Register interstitial!") }).catch((err) => { console.log("INTERSTIAL ERROR : ", err) }); // Register Interstitial
    if (categoryId) {
      this.router.navigate(['/category', categoryId]);
    } else {
      this.router.navigate(['/category']);
      this.activeIndex = -1;
    }
    this.sidebarService.sidebarClose();
    this.gameService.playModeOff();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
