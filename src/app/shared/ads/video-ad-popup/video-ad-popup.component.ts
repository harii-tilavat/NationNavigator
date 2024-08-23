import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbActiveModal } from '../../ng-modal';
import { AdService } from '../../../_services';
import { AdType } from '../../../_enum';

@Component({
  selector: 'app-video-ad-popup',
  templateUrl: './video-ad-popup.component.html',
  styleUrl: './video-ad-popup.component.scss'
})
export class VideoAdPopupComponent implements OnInit, OnDestroy, AfterViewInit {
  public adSecond: number = 0;
  public isAdFinished = false;
  public message!: string;
  public subscription: Subscription[] = [];

  constructor(private ngbActiveModal: NgbActiveModal, private adService: AdService) { }

  ngOnInit(): void {
    this.message = `This ad will close after ${this.adSecond} second${this.adSecond > 1 ? 's' : ''}.`;
  }
  ngAfterViewInit(): void {
    this.adService.registerAds('/23183718078/Hop_dialog', [[1024, 768], [320, 480], [970, 250]], 'div-gpt-ad-1720008395608-0', AdType.BANNER_BIG).then(() => { }).catch(() => { }); // Google
    // this.adService.registerAds('/21857590943,23113948477/pss_hopgame.in/300x600', [[1024, 768], [320, 480], [970, 250]], 'div-gpt-ad-1720008395608-0').then(() => { }).catch(() => { });
  }
  closeModal(): void {
    this.ngbActiveModal.close(true);
  }
  ngOnDestroy(): void {
    this.adService.destroyAdSense('div-gpt-ad-1720008395608-0');
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
