import { Injectable, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, NgbModalRef } from '../../shared/ng-modal';
import { VideoAdPopupComponent } from '../../shared/ads/video-ad-popup/video-ad-popup.component';
import { environment } from '../../../environments/environment';
import { AdType } from '../../_enum';
import { SidePopupComponent } from '../../shared/ads/side-popup/side-popup.component';


@Injectable({
  providedIn: 'root'
})

export class AdService {
  private gameToken = 'aB3dE5fG7hI9jK1lM2nO4pQ6rS8tU0vW2xY4zA6cD8eF1gH3iJ5kL7mN9oP1qR3sT5uV7wX9yZ0bC2dE4'; // If this tokan available in localstorage then Popup will not show
  private refreshInterval: any;
  public interstitialSlotUnit!: string;

  constructor(@Inject(PLATFORM_ID) private platformId: any, @Inject('window') public window: Window, private modalService: NgbModal, private ngZone: NgZone) { }

  initializeAdSense(): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
      return Promise.resolve();
    }
    return new Promise<void>((resolve, reject) => {
      if (!googletag) {
        setTimeout(() => {
          googletag = window.googletag;
          resolve(googletag);
        }, 1000);
      } else {
        resolve(googletag);
      }
    });
  }

  registerAds(banner: string, size: Array<any>, divId: string, adType: AdType = AdType.BANNER_BIG, isTesting: boolean = false): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
    }
    return Promise.resolve();
    return new Promise<void>(async (resolve, reject) => {
      await this.initializeAdSense();

      if (googletag && googletag.cmd) {

        googletag.cmd.push(() => {

          // ------------------------------------ Size mapping of Different devices. ------------------------------------
          const adSizeMapping = {
            [AdType.STICKY]: googletag.sizeMapping()
              .addSize([992, 0], [[728, 90], [1, 1]])
              .addSize([728, 0], [[728, 90], [336, 90], [300, 90], [1, 1]])
              .addSize([320, 0], [[320, 90], [320, 50], [292, 30], [234, 60], [1, 1]])
              .addSize([0, 0], [[320, 90], [320, 50], [292, 30], [234, 60], [1, 1]])
              .build(),

            [AdType.SQUARE]: googletag.sizeMapping()
              .addSize([992, 0], [[336, 280], [300, 250], [1, 1]])
              .addSize([728, 0], [[336, 280], [300, 250], [1, 1]])
              .addSize([320, 0], [[300, 250], [1, 1]])
              .addSize([0, 0], [[300, 250], [1, 1]])
              .build(),

            [AdType.BANNER_BIG]: googletag.sizeMapping()
              .addSize([992, 0], [[970, 250], [970, 90], [728, 250], [728, 90], [336, 280], [300, 250], [1, 1]])
              .addSize([728, 0], [[728, 250], [728, 90], [336, 280], [300, 250], [1, 1]])
              .addSize([320, 0], [[320, 100], [320, 50], [300, 250], [1, 1]])
              .addSize([0, 0], [[320, 50], [1, 1]])
              .build(),

            [AdType.BANNER_SMALL]: googletag.sizeMapping()
              .addSize([992, 0], [[468, 60], [1, 1]])
              .addSize([728, 0], [[468, 60], [1, 1]])
              .addSize([320, 0], [[320, 50], [1, 1]])
              .addSize([0, 0], [[320, 50], [1, 1]])
              .build()
          };
          banner = isTesting ? '/6499/example/banner' : banner; // If testing mode = true then testing slot will display

          const displaySlot = googletag.defineSlot(banner, size, divId);
          if (displaySlot) {
            displaySlot.defineSizeMapping(adSizeMapping[adType]);
            displaySlot.addService(googletag.pubads());
            googletag.pubads().enableSingleRequest()
            googletag.enableServices();
            googletag.display(divId);
            console.log('====+>>>><<<<<<<<', displaySlot.getAdUnitPath(), '====+>>>><<<<<<<<');
          }
          const slots = googletag.pubads().getSlots();
          const listOfIds = slots.map((i: any) => i.getSlotId().getId()) as Array<string> || [];
          // const listOfIds = slots.map((i: any) => i.getSlotId().getDomId()) as Array<string> || [];
          // console.log("LIST OF IDS : ", listOfIds);
          // console.log('====+>>>><<<<<<<<', divId, '====+>>>><<<<<<<<');
          resolve(googletag);
        });
      } else {
        reject();
      }
    });
  }
  // ----------------------------------- /6355419/Travel/Europe/France/Paris -------------------------------- Google Testing
  // ----------------------------------- /6499/example/interstitial -------------------------------- Google Testing GTM 1
  // ----------------------------------- /21857590943,23113948477/pss_hopgame.in/interstitial -------------------------------- Profitsense tag

  registerInterstitalAd(slot: string = '/21857590943,23113948477/pss_hopgame.in/interstitial'): Promise<void> {
    this.interstitialSlotUnit = slot;
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
      return Promise.resolve();
    }
    return Promise.resolve();
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.initializeAdSense();
        if (googletag && googletag.cmd) {
          googletag.cmd.push(() => {
            // ------------------------------------ Load interstitial ad ------------------------------------
            const existingSlot = googletag.pubads().getSlots().find((i: any) => i.getAdUnitPath() === this.interstitialSlotUnit);
            if (existingSlot) {
              googletag.destroySlots([existingSlot]);
            }
            const interstitialSlot = googletag.defineOutOfPageSlot(slot, googletag.enums.OutOfPageFormat.INTERSTITIAL);
            if (interstitialSlot) {
              // The publisher wants to enable the 'unhideWindow' trigger.
              interstitialSlot.setConfig({
                interstitial: {
                  triggers: {
                    unhideWindow: true,
                  },
                },
              });
              interstitialSlot.addService(googletag.pubads());
              googletag.pubads().setCentering(true); // ps
              googletag.pubads().collapseEmptyDivs(); // ps

              googletag.pubads().enableSingleRequest();
              googletag.pubads().set('page_url', environment.baseUrl);
              googletag.enableServices();
              googletag.display(interstitialSlot);


              googletag.pubads().addEventListener('slotOnload', (event: any) => {
                // console.log('EVENT : ', event);
                if (event.slot === interstitialSlot) {
                  console.log('Interstitial ad loaded and displayed');
                  // debugger

                  // const insElement = document.getElementById(`${interstitialSlot.getSlotElementId()}`);
                  // setTimeout(() => {
                  //   googletag.display(interstitialSlot);
                  //   if (insElement) {
                  //     (insElement as HTMLElement).style.display = 'block';
                  //     console.log(insElement);
                  //   }
                  // }, 1000);
                }
              });
            }
            resolve(googletag);
          });
        } else {
          reject(new Error("Google tag is not defined!"));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  refreshAds(divId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
      return;
    }
    return
    if (googletag && googletag.cmd) {
      googletag.cmd.push(() => {
        googletag.pubads().refresh([divId]);
      });
    }
  }
  refreshAllAds(): void {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
      return;
    }
    if (googletag && googletag.cmd) {
      googletag.cmd.push(() => {
        googletag.pubads().refresh();
      });
    }
  }
  destroyAdSense(divIds: string): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }
    return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      if (googletag) {
        googletag.cmd.push(() => {
          const slots = googletag.pubads().getSlots();
          slots.forEach((slot: any) => {
            if (slot.getSlotId().getDomId() === divIds) {
              googletag.destroySlots([slot]);
            }
          });
          resolve();
        });
      }
    });
  }
  displayAd(divIds: string): Promise<any> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }
    return Promise.resolve();
    return new Promise<void>((resolve, reject) => {
      if (googletag) {
        googletag.cmd.push(() => {
          googletag.display(divIds);
          resolve();
        });
      }
    });
  }
  setupRefreshInterval(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      // If not in the browser environment, return resolved promise
      return Promise.resolve();
    }
    return Promise.resolve();
    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.initializeAdSense();

        if (googletag && googletag.cmd) {
          this.ngZone.runOutsideAngular(() => {
            this.refreshInterval = setInterval(() => {
              // console.log("Interstitial slot : ", this.interstitialSlotUnit);
              const slots = googletag.pubads().getSlots().filter((i: any) => i.getAdUnitPath() !== this.interstitialSlotUnit) || googletag.pubads().getSlots();
              if (slots && slots.length) {
                googletag.cmd.push(() => {
                  googletag.pubads().refresh(slots);
                  console.log("AD REFRESHED!");
                });
              }
            }, 30000); // After 30 seconds all ads will be refresh
          });
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  clearRefreshInterval() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  // initJs(): Promise<any> {
  //   if (!isPlatformBrowser(this.platformId)) {
  //     // If not in the browser environment, return resolved promise
  //     return Promise.resolve();
  //   }

  //   return new Promise<void>((resolve, reject) => {
  //     const script = document.createElement('script');
  //     script.src = 'https://tags.profitsence.com/scripts/profitSenceAdRotationV1.js';
  //     script.onload = () => {
  //       googletag.cmd.push(() => {
  //         googletag.pubads().enableSingleRequest();
  //         googletag.enableServices();
  //         googletag.log('Helloooo ====>>>');
  //         resolve(googletag);
  //       });
  //       // init();
  //     };
  //     script.onerror = (error) => {
  //       reject(error);
  //     };
  //     (document.getElementById('ps_ad_rotation_id_6915') as HTMLElement).appendChild(script);
  //   });
  // }

  // Display video ad
  async showAdPopup(totalSeconds: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        return Promise.resolve();
        if (localStorage.getItem("gameToken") === this.gameToken || !environment.production) {
          resolve(true);
          return
        }
        const modalRef = this.modalService.open(VideoAdPopupComponent, { size: 'xl', backdrop: 'static', keyboard: false, centered: false, container: '#video-ad' });
        const isAdFinished = await this.setTimerInterval(modalRef, totalSeconds);
        resolve(isAdFinished);
      } catch (error) {
        reject(error);
      }
    });
  }

  async showSideAdPopup(totalSeconds: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        return Promise.resolve();
        const modalRef = this.modalService.open(SidePopupComponent, { size: 'md', backdrop: false, keyboard: false, centered: false, container: '#side-popup' });
        const isAdFinished = await this.setTimerInterval(modalRef, totalSeconds);
        resolve(isAdFinished);
      } catch (error) {
        reject(error);
      }
    })
  }
  async setTimerInterval(modalRef: NgbModalRef, totalSeconds: number): Promise<boolean> {
    return new Promise(async(resolve, reject) => {
      try {
        return Promise.resolve();
        modalRef.componentInstance.adSecond = totalSeconds;
        const interval = setInterval(async () => {
          if (totalSeconds <= 1) {
            modalRef.componentInstance.isAdFinished = true;
            const result = await modalRef.result;
            clearInterval(interval);
            resolve(result);
            return;
          }
          modalRef.componentInstance.adSecond = --totalSeconds;
        }, 1000);
      } catch (error) {
        reject(error);
      }
    })
  }
  // Other methods for managing ads can be added here
}
