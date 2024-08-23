import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrowserService } from '../../../_services';

@Component({
  selector: 'app-test-webcam',
  templateUrl: './test-webcam.component.html',
  styleUrl: './test-webcam.component.scss'
})
export class TestWebcamComponent implements OnInit, OnDestroy {
  @ViewChild('webcamElement', { static: false }) webcamElement!: ElementRef<HTMLVideoElement>;
  public subscription: Subscription[] = [];
  public videoStream!: MediaStream;
  public videoInputDevices: Array<MediaDeviceInfo> = [];
  public isTestingMode = true;

  constructor(private browserService: BrowserService) { }
  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    this.getAudioOutputDevices();
  }
  async requestPermissions(): Promise<void> {
    try {
      console.log("Element : ", this.webcamElement);
      this.videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.webcamElement.nativeElement.srcObject = this.videoStream;
      console.log("Video Stream : ", this.videoStream);

    } catch (err) {
      console.error('Error accessing webcam: ', err);
    }
  }
  async getAudioOutputDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("Audio Input DEVICES : ", devices.filter(i => i.kind === 'audioinput'));
      console.log("Audio Output DEVICES : ", devices.filter(i => i.kind === 'audiooutput'));
      console.log("Video DEVICES : ", devices.filter(i => i.kind === 'videoinput'));
      if (devices && devices.length) {
        this.videoInputDevices = devices.filter(i => i.kind === 'videoinput');
      }
    } catch (err) {
      console.error('Error getting audio output devices: ', err);
    }
  }
  handleInitError(event: any): void {
    console.log("event : ", event); 
  }
  startTesting(): void {
    this.requestPermissions();
    this.isTestingMode = true;
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.forEach(item => item.unsubscribe());
    }
  }

}
