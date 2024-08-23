import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdConfigModel } from '../../_model';
import { BrowserService } from '../../_services';

@Component({
  selector: 'app-hop-ad',
  templateUrl: './hop-ad.component.html',
  styleUrl: './hop-ad.component.scss'
})
export class HopAdComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input({ required: false }) adConfig: AdConfigModel = {
    dataAdClient: '',
    dataAdFormat: '',
    dataFullWidthResponsive: true,
    dataAdSlot: ''
  }
  // @Input({ 'required': false }) adConfig: AdConfigModel = {
  //   dataAdClient: 'ca-pub-2475964352287676',
  //   dataAdSlot: '2998617014',
  //   dataAdFormat: 'auto',
  //   dataFullWidthResponsive: true
  // }
  public subscription: Subscription[] = [];

  constructor(private browserService: BrowserService) { }

  ngOnInit(): void {
    if (this.browserService.isBrowser()) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        // console.error('Adsense error: ', e);
      }
    }
  }
  ngAfterViewInit(): void {
    if (this.browserService.isBrowser()) {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch (e) {
        // console.error('Adsense error: ', e);
      }
    }
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
