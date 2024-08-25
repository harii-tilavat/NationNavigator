import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { BrowserService, GameService, SidebarService } from '../../_services';
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
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl(null, []),
  });
  constructor(private sidebarService: SidebarService, private router: Router, private gameService: GameService, private browserService: BrowserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    const storedTheme = localStorage.getItem('theme');
    this.isDarkMode = storedTheme === 'dark';

    // Apply the retrieved theme
    this.applyTheme();
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
    this.applyTheme();
  }
  applyTheme(): void {
    const htmlElement = document.getElementsByTagName('html')[0];
    this.renderer.addClass(htmlElement, this.isDarkMode ? 'theme-dark' : 'theme-light');
    this.renderer.removeClass(htmlElement, this.isDarkMode ? 'theme-light' : 'theme-dark');
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
