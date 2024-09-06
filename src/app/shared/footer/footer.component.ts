import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SidebarService, ThemeService } from '../../_services';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  public year: number = new Date().getFullYear();
  public subscription: Subscription[] = [];
  public emailLink: string = environment.email;
  public website = 'hopgame.in';
  public logoUrl = '/assets/images/svg/nn-logo-dark.svg';
  public contactLinks: Array<any> = [
    {
      id: 1,
      title: 'Email',
      link: this.emailLink,
      icon: 'email',
      enum: 'EMAIL'
    },
    {
      id: 2,
      title: 'Linkedin',
      link: 'https://www.facebook.com/profile.php?id=61560286072988',
      icon: 'linkedin',
      enum: 'LINKEDIN'
    },
    {
      id: 3,
      title: 'Github',
      link: 'https://www.instagram.com/hopgamehelp/',
      icon: 'github',
      enum: 'Github'
    },
  ]
  constructor(private router: Router, private sidebarService: SidebarService, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.subscription.push(
      this.themeService.themeSubject.subscribe((isDarkMode: boolean) => {
        this.logoUrl = this.themeService.logoUrl;
      })
    );

  }
  goToPage(route: Array<string>): void {
    this.router.navigate(route);
    this.sidebarService.activateMenu(-1);
  }
  scrollTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }
}
