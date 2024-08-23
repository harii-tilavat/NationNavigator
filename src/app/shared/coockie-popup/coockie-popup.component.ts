import { Component, OnInit, OnDestroy, output, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from '../../_services';
@Component({
  selector: 'app-coockie-popup',
  templateUrl: './coockie-popup.component.html',
  styleUrl: './coockie-popup.component.scss'
})
export class CoockiePopupComponent implements OnInit, OnDestroy {
  @Output() coockieEvent = new EventEmitter<boolean>();
  public subscription: Subscription[] = [];

  constructor(private router: Router, private coockieService: CookieService) { }

  ngOnInit(): void {
  }
  acceptCookie(): void {
    // this.coockieService.acceptCookies();
    this.coockieEvent.emit();
  }
  goToPage(): void {
    this.router.navigate(['/privacy-policy']);
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
