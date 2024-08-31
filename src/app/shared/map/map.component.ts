import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrowserService } from '../../_services';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  //   @Input() lat: number | undefined = 51.505;
  //   @Input() lng: number | undefined = -0.09;
  //   private map?: L.Map;
  //   public subscription: Subscription[] = [];

  // constructor(private browserService: BrowserService) { }

  // ngOnInit(): void { }



  //   ngAfterViewInit(): void {
  //     if (!this.browserService.isBrowser()) return;
  //     // this.initMap();
  //   }

  //   private initMap(): void {
  //     if (!this.browserService.isBrowser()) return;
  //     this.map = L.map('map').setView([51.505, -0.09], 13); // Default coordinates (London)

  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     }).addTo(this.map);

  //     // Add a marker at the center of the map
  //     L.marker([51.5, -0.09]).addTo(this.map)
  //       .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
  //       .openPopup();
  //   }

  //   ngOnDestroy(): void {
  //     this.subscription.forEach(i => i.unsubscribe());
  //   }
}
