import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdService } from '../../../_services';
import { AdType } from '../../../_enum';
import { NgbActiveModal } from '../../ng-modal';
@Component({
  selector: 'app-side-popup',
  templateUrl: './side-popup.component.html',
  styleUrl: './side-popup.component.scss'
})
export class SidePopupComponent implements OnInit, OnDestroy, AfterViewInit {
  public adSecond: number = 0;
  public isAdFinished = false;
  public subscription: Subscription[] = [];

  constructor(private ngbActiveModal: NgbActiveModal, private adService: AdService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.loadAdCodes();
  }

  loadAdCodes(): void {
    try {
      this.adService.registerAds('/23183718078/HopBanner_320x480-test', [320, 250], 'side-popup-div-gpt-ad-1719924717785-0', AdType.SQUARE).then(() => { }).catch(() => { });  // Google
    } catch (error) {
      console.log('Error loading ad codes for SIDE POPUP:', error);
    }
  }
  closeAd(): void {
    this.ngbActiveModal.close(true);
  }

  ngOnDestroy(): void {
    this.adService.destroyAdSense('side-popup-div-gpt-ad-1719924717785-0');

    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
