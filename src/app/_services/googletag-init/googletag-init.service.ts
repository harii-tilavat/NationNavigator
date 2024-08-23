import { Injectable, Inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { AdService } from '..';


function _window(): any {
  return window;
}
@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}

@Injectable({
  providedIn: 'root'
})
export class GoogletagInitService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private adService: AdService) {
    afterNextRender(() => {
      // (window as any).googletag = (window as any).googletag || {};
    });
  }

  initGoogletag(): () => void {
    return () => {
      if (isPlatformBrowser(this.platformId)) {
        this.loadGoogleTagScript();
      }
    };
  }

  private loadGoogleTagScript() {
    try {
      // const script = document.createElement('script');
      // script.type = 'text/javascript';
      // script.async = true;
      // script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
      // script.crossOrigin = 'anonymous';
      // script.onerror = () => {
      //   console.error('Failed to load Google Publisher Tag script.');
      // };
      // script.onload = () => {
      //   // this.adService.registerInterstitalAd().then(() => { }).catch(() => { });
      // }
      // document.head.appendChild(script);

    } catch (error) {
      console.log("ERROR IN LOAD SCRIPT : Failed to load Google Publisher Tag script.");
    }
  }
}
