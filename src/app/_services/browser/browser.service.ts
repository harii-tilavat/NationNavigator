import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {

  constructor(@Inject(PLATFORM_ID) private platformId: any,) { }

  isBrowser(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return true
    }
    return false
  }
}
