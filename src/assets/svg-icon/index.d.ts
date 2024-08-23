import type { TmdIcon } from './build/my-icons.model';
export type TmdIconNameSubset<T extends Readonly<TmdIcon[]>> = T[number]['name'];
export * from './build/ng-favicon.icon';
export * from './build/ng-logo-dark.icon';
export * from './build/ng-logo-light.icon';
export * from './build/ng-power-off.icon';
export * from './build/ng-rocket.icon';
export * from './build/my-icons.model';
