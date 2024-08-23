import { Injectable } from '@angular/core';
import { TmdIcon } from '../../assets/svg-icon';
import * as icons from '../../assets/svg-icon';

@Injectable({
  providedIn: 'root'
})
export class IconsRegistry {

  private registry = new Map<string, string>();
  private iconListType = icons;
  private iconList: Array<TmdIcon> = [];
  constructor() {
    for (const prop in this.iconListType) {
      this.iconList.push((this.iconListType as Record<string, TmdIcon>)[prop])
    }
    this.registerIcons(this.iconList);
  }
  public registerIcons(icons: TmdIcon[]): void {
    icons.forEach((icon: TmdIcon) => this.registry.set(icon.name, icon.data));
  }

  public getIcon(iconName: string): string | undefined {
    if (iconName) {
      if (!this.registry.has(iconName)) {
        console.warn(`We could not find the Icon with the name ${iconName}, did you add it to the Icon registry?`);
      }
      return this.registry.get(iconName);
    }
    return undefined;
  }
}
