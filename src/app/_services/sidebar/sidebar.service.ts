import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DeviceTypeService } from '../device-type/device-type.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public isSidebarOpen = new BehaviorSubject<boolean>(true);
  public activeMenuIndex = new BehaviorSubject<number>(-1);
  constructor(private deviceTypeService: DeviceTypeService) { }

  activateMenu(id: number) {
    this.activeMenuIndex.next(id);
  }
  sidebarOpen() {
    this.isSidebarOpen.next(true);
  }

  sidebarClose() {
    if (this.deviceTypeService.isSmallTab()) {
      this.isSidebarOpen.next(true);
    }
  }
}
