import { ChangeDetectionStrategy, Component, ElementRef, Inject, Input, Optional, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IconsRegistry } from './icon-registry';
import { DOCUMENT } from '@angular/common';
import { BrowserService } from '../_services';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'tmd-icon',
  templateUrl: './tmd-icon.component.html',
  styles: [':host {    display: flex;justify-content: center;align-items: center;width: 100%; height: 100%;} :host::ng-deep svg{width: 100%; height: 100%}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TmdIconComponent implements OnDestroy, OnChanges {
  public subscription: Array<Subscription> = [];
  private svgIcon: SVGElement | undefined;
  @Input() isDefault = false;
  // fill: string | undefined;
  @Input()
  set name(iconName: string | null) {
    if (!this.browserService.isBrowser()) return;
    if (this.svgIcon) {
      this.element.nativeElement.removeChild(this.svgIcon);
    }
    const svgData = this.iconsRegistry.getIcon(iconName as string) || null;
    if (svgData) {
      this.svgIcon = this.svgElementFromString(svgData);
      this.element.nativeElement.appendChild(this.svgIcon);

      if (this.isDefault) return;
      const paths = this.svgIcon.getElementsByTagName('path') as HTMLCollection;
      for (let i = 0; i < paths.length; i++) {
        (paths[i] as HTMLElement).style.fill = 'currentColor';
      }

    }
  }
  @Input()
  set fill(color: string) {
    if (this.svgIcon && color) {
      const paths = this.svgIcon.getElementsByTagName('path') as HTMLCollection;
      if (this.svgIcon.getAttribute('fill')) {
        this.svgIcon.setAttribute('fill', color);
      }
      for (let i = 0; i < paths.length; i++) {
        paths[i].setAttribute('fill', color);
      }
    }
  }

  @Input()
  set stroke(color: string) {
    if (this.svgIcon && color) {
      const paths = this.svgIcon.getElementsByTagName('path') as HTMLCollection;
      for (let i = 0; i < paths.length; i++) {
        if (paths[i].getAttribute('stroke')) {
          paths[i].setAttribute('stroke', color);
        }
      }
    }
  }

  @Input()
  set rectStroke(color: string) {
    if (this.svgIcon && color) {
      const paths = this.svgIcon.getElementsByTagName('rect') as HTMLCollection;
      for (let i = 0; i < paths.length; i++) {
        if (paths[i].getAttribute('stroke')) {
          paths[i].setAttribute('stroke', color);
        }
      }
    }
  }
  @Input()
  set rectFill(color: string) {
    if (this.svgIcon && color) {
      const paths = this.svgIcon.getElementsByTagName('rect') as HTMLCollection;
      for (let i = 0; i < paths.length; i++) {
        if (paths[i].getAttribute('fill')) {
          paths[i].setAttribute('fill', color);
        }
      }
    }
  }
  constructor(private element: ElementRef, private iconsRegistry: IconsRegistry, @Optional() @Inject(DOCUMENT) private document: Document, private browserService: BrowserService) {
  }

  private svgElementFromString(svgContent: string): SVGElement {
    const div = this.document.createElement('DIV');
    div.innerHTML = svgContent;
    return div.querySelector('svg') || this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }

}
