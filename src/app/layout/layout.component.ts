import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrowserService } from '../_services';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  public subscription: Subscription[] = [];
  public isSidebarOpen = false;
  public sidePopupTimer = 15; // After this seconds popup will reappear.
  public timeout: any;
  public isShowScrollToTop = false;
  constructor(private browserService: BrowserService) {
  }
  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
  }

  ngAfterViewInit(): void {
    if (!this.browserService.isBrowser()) return;
  }

  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  @HostListener('window:scroll')
  checkScroll() {
    // Get current scroll position
    const scrollPosition = window.scrollY;
    this.isShowScrollToTop = scrollPosition >= 800 ? true : false;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
