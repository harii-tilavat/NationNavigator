import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrl: './terms-and-condition.component.scss'
})
export class TermsAndConditionComponent implements OnInit, OnDestroy{
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
