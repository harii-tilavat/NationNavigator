import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }
  isMobile() {
    return this.isBrowser() && window.innerWidth < 576;
  }
  isSmallTab() {
    return this.isBrowser() && window.innerWidth < 776;
  }
  isTeblet() {
    return this.isBrowser() && window.innerWidth < 992;
  }
  isDesktop() {
    return this.isBrowser() && window.innerWidth >= 992;
  }
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
