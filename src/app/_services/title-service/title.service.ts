import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title, private metaService: Meta,private activatedRoute:ActivatedRoute ,private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

  setTitle(newTitle: string): void {
    this.title.setTitle(newTitle);
  }
  getTitle(): string {
    return this.title.getTitle();
  }
  setMeta(item: { description: string, keywords: string }): void {
    // this.metaService.addTag({ name: item.name, content: item.content })
    this.metaService.updateTag({ name: 'description', content: item.description });
    this.metaService.updateTag({ name: 'keywords', content: item.keywords });
  }
  getMeta(key: string): string {
    const metaContent = this.metaService.getTag(key) as HTMLMetaElement;
    return metaContent.content;
  }
  setCanonicalURL(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      let link: HTMLLinkElement | null = this.getLinkForCanonicalURL();
      if (link) {
        link.setAttribute('href', url);
      } else {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        document.head.appendChild(link);
      }
    }
  }
  getCanonicalUrl(): string {
    return environment.baseUrl + this.router.url;
  }
  getLinkForCanonicalURL(): HTMLLinkElement | null {
    return isPlatformBrowser(this.platformId) ? document.querySelector("link[rel='canonical']") : null;
  }
}
