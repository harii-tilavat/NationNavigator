import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title: Title, private metaService: Meta, private activatedRoute: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

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
}
