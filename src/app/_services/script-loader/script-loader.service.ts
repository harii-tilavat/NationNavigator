import { Injectable } from '@angular/core';
import { BrowserService } from '../browser/browser.service';

@Injectable({
  providedIn: 'root'
})
export class ScriptLoaderService {
  constructor(private browserService: BrowserService) { }
  loadScript(src: string): Promise<void> {

    return new Promise((resolve, reject) => {
      if (this.browserService.isBrowser()) {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject();
        document.head.appendChild(script);
      }
    });
  }
}
