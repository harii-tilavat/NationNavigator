import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-dmca-policy',
  templateUrl: './dmca-policy.component.html',
  styleUrl: './dmca-policy.component.scss'
})
export class DmcaPolicyComponent implements OnInit, OnDestroy{
  public email: string = environment.email;
  public websiteLink: string = environment.baseUrl;
  public websiteName: string = environment.website;
  public subscription: Subscription[] = [];
  constructor() { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
