import { Component, OnInit, OnDestroy, Renderer2, Output, EventEmitter } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { BrowserService, GameService, SidebarService, ThemeService } from '../../_services';
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
  public query !: string;
  public isDarkMode = true;
  public logoUrl = '/assets/images/svg/nn-logo-dark.svg';
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl(null, []),
  });
  constructor(private sidebarService: SidebarService, private router: Router, private gameService: GameService, private browserService: BrowserService, private renderer: Renderer2, private themeService: ThemeService) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    // Initialize theme
    this.subscription.push(
      this.themeService.themeSubject.subscribe((isDarkMode: boolean) => {
        this.logoUrl = this.themeService.logoUrl;
        this.isDarkMode = isDarkMode;
      })
    );
  }
  goToHome(): void {
    this.router.navigate(['/']);
    this.sidebarService.activateMenu(-1);
  }
  sidebarToggle(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarService.isSidebarOpen.next(this.isSidebarOpen);
  }
  toggleTheme(): void {
    if (!this.browserService.isBrowser()) return;
    this.themeService.toggleTheme();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
