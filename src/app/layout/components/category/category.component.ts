import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdConfigModel, GameModel, } from '../../../_model';
import { GameListCategory, GameMenuList } from '../../../../assets/game';
import { SidebarService, TitleService } from '../../../_services';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  // public testEnv = environment;
  public subscription: Subscription[] = [];
  public gameList: Array<GameModel> = GameListCategory;
  public gameListCategory: Array<GameModel> = [];
  public selectedGame!: GameModel;
  public gameCategory!: string;
  public isIframe = false;
  public isLoading = false;
  public filteredData: Array<GameModel> = [];
  public adConfigBigBanner: AdConfigModel = {
    dataAdClient: 'ca-pub-2475964352287676',
    dataAdSlot: '7255209184',
    dataAdFormat: 'auto',
    dataFullWidthResponsive: true
  };
  public pagination = {
    itemPerPage: 12,
    page: 1,
    startIndex: 0,
    endIndex: 12
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sidebarService: SidebarService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.gameList = GameListCategory.sort((a, b) => a.sortOrder - b.sortOrder);
    this.subscription.push(
      this.activatedRoute.params.subscribe({
        next: (res) => {
          this.isLoading = false;
          this.gameCategory = GameMenuList.find(i => i.id === res['id'])?.title || 'All games';
          if (res && res['id']) {
            this.gameListCategory = this.gameList.filter(i => i.categoryId === res['id']);
            this.sidebarService.activateMenu(+res['id']);
          } else {
            this.gameListCategory = this.gameList;
          }
          // Select any random game Logic
          this.selectedGame = this.gameListCategory[Math.floor(Math.random() * this.gameCategory.length)];
          // this.filteredData = this.filterData();
        },
      })
    );
  }
  // Pending Pagination
  changePage(): void {
    this.pagination.startIndex = (this.pagination.itemPerPage * (this.pagination.page - 1));
    this.pagination.endIndex = (this.pagination.itemPerPage * this.pagination.page);
    console.log("START : ", this.pagination.startIndex, "END : ", this.pagination.endIndex);
    console.log("PAGE: ", this.pagination.page);
    this.filterData(this.pagination.startIndex, this.pagination.endIndex);
  }
  previousPage(): void {
    if (this.pagination.startIndex === 0) return
    this.pagination.page--;
    this.changePage();
  }
  nextPage(): void {
    if (this.pagination.endIndex > this.gameListCategory.length - 1) return
    this.pagination.page++;
    this.changePage();
  }
  filterData(sIndex: number = 0, eIndex: number = 12): Array<GameModel> {
    return this.gameListCategory.slice(sIndex, eIndex);
  }
  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
