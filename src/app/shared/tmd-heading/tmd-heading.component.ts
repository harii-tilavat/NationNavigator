import { Component, OnInit, OnDestroy, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tmd-heading',
  templateUrl: './tmd-heading.component.html',
  styleUrl: './tmd-heading.component.scss'
})
export class TmdHeadingComponent implements OnInit, OnDestroy {
  @Output() startTestingEvent = new EventEmitter(); //Pending...
  @Input() deviceName!: string;
  @Input() description!: string;
  public subscription: Subscription[] = [];

  constructor() { }
  ngOnInit(): void {

  }
  startTesting(): void {
    this.startTestingEvent.emit();
  }
  ngOnDestroy(): void {
    this.subscription.forEach(i => i.unsubscribe());
  }
}
