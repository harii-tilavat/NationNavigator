import { Component, OnInit, OnDestroy, HostListener, AfterViewInit, } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdService, BrowserService, DeviceTypeService, SidebarService } from '../_services';
import { AdType } from '../_enum';
import { NgbModal } from '../shared/ng-modal';
import { SidePopupComponent } from '../shared/ads/side-popup/side-popup.component';

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
  constructor(private sidebarService: SidebarService, private deviceTypeService: DeviceTypeService, private browserService: BrowserService, public adService: AdService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.subscription.push(this.sidebarService.isSidebarOpen.subscribe({
      next: (res: boolean) => {
        this.isSidebarOpen = res;
      }
    }))
  }

  ngAfterViewInit(): void {
    if (this.browserService.isBrowser()) {
      try {
        this.loadAdCodes(); // Loading AD Code.
        this.showSideAd(); // Call the SIDE POPUP AD
      } catch (e) {
        // console.error('Adsense error: ', e);
      }
    }
  }

  loadAdCodes(): void {
    try {
      Promise.all([
        // this.adService.registerAds('/23183718078/Hop_Bannersmart', [[300, 50], [320, 100], [320, 50], [300, 100]], 'div-gpt-ad-1719914737924-0', AdType.BANNER_BIG), // PS
        this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/728x90', [[300, 50], [320, 100], [320, 50], [300, 100]], 'div-gpt-ad-1719914737924-0', AdType.BANNER_BIG), // PS
        this.adService.registerAds('/23183718078/hopbottombanner', [[320, 100], [950, 90], [320, 50], [970, 90], [300, 100], [300, 50], [980, 90], [750, 100]], 'div-gpt-ad-1720764810146-0', AdType.STICKY), // New Google
      ]).then(() => { }).catch(() => { });

    } catch (error) {
      console.error('Error loading ad codes:', error);
    }
  }
  async showSideAd(): Promise<boolean> {
    try {
      const isAdFinished = await this.adService.showSideAdPopup(5);
      if (isAdFinished) {
        console.log("Ad closed. Wait for next cycle.");
        this.timeout = setTimeout(() => {
          this.showSideAd();
        }, this.sidePopupTimer * 1000);
      }
      return isAdFinished;
    } catch (error) {
      console.log("ERROR SIDE POPUP : ", error);
      return false
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.sidebarToggle();
    // You can perform actions based on the resize event;
  }
  sidebarToggle() {
    if (this.deviceTypeService.isDesktop()) {
      this.sidebarService.sidebarOpen();
      return;
    } else {
      this.sidebarService.sidebarClose();
      return;
    }
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1719914737924-0');
    this.adService.destroyAdSense('div-gpt-ad-1720764810146-0');
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
