import { isPlatformBrowser } from '@angular/common';
import { EventEmitter, Inject, Injectable, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {
  public fullscreenChange: Subject<boolean> = new Subject<boolean>();
  public fullScreenElement !: HTMLElement;
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
      document.addEventListener('mozfullscreenchange', this.handleFullscreenChange.bind(this)); // Firefox
      document.addEventListener('webkitfullscreenchange', this.handleFullscreenChange.bind(this)); // Chrome, Safari and Opera
      document.addEventListener('MSFullscreenChange', this.handleFullscreenChange.bind(this)); // IE/Edge
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

  }
  requestToFullScreen(element: any) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    } else {
      // Fallback for iOS Safari
      this.fullScreenElement = element;
      element.classList.add('fullscreen');
      this.handleFullscreenChange();
    }
  }
  private handleFullscreenChange(): void {
    if (this.isBrowser) {
      this.fullscreenChange.next(this.isFullscreen());
    }
  }

  exitFullScreen(): void {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // IE/Edge
      (document as any).msExitFullscreen();
    } else {
      // Fallback for iOS Safari
      if (this.fullScreenElement) {
        this.fullScreenElement.classList.remove('fullscreen');
        this.handleFullscreenChange();
      }
    }
  }
  isFullscreen(): boolean {
    return !!(
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement ||
      (this.fullScreenElement && this.fullScreenElement.classList.contains('fullscreen'))
    );
  }
  private handleKeyDown(event: KeyboardEvent): void {
    // In IOS when Excape press then it exits from full screen
    if (event.key === 'Escape' && this.isFullscreen()) {
      this.exitFullScreen();
    }
  }
}
