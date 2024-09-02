import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BrowserService } from '../browser/browser.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer!: Renderer2;
  public isDarkMode: boolean = true;
  public logoUrl: string = '/assets/images/svg/nn-logo-dark.svg';

  private readonly darkModeClass = 'theme-dark';
  private readonly lightModeClass = 'theme-light';
  private readonly darkLogoUrl = '/assets/images/svg/nn-logo-dark.svg';
  private readonly lightLogoUrl = '/assets/images/svg/nn-logo-light.svg';
  // Observable for theme changes
  public themeSubject = new BehaviorSubject<boolean>(this.isDarkMode);

  constructor(rendererFactory: RendererFactory2, private browserService: BrowserService) {
    if (!this.browserService.isBrowser()) return;
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.logoUrl = this.isDarkMode ? this.darkLogoUrl : this.lightLogoUrl;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (!this.browserService.isBrowser()) return;
    const htmlElement = document.getElementsByTagName('html')[0];
    this.renderer.addClass(htmlElement, this.isDarkMode ? this.darkModeClass : this.lightModeClass);
    this.renderer.removeClass(htmlElement, this.isDarkMode ? this.lightModeClass : this.darkModeClass);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.logoUrl = this.isDarkMode ? this.darkLogoUrl : this.lightLogoUrl;
    // Notify subscribers of the theme change
    this.themeSubject.next(this.isDarkMode);
  }
}
