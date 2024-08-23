import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BrowserService } from '../../../_services';

@Component({
  selector: 'app-test-headphones',
  templateUrl: './test-headphones.component.html',
  styleUrl: './test-headphones.component.scss'
})
export class TestHeadphonesComponent implements OnInit {
  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;
  public audioContext!: AudioContext;
  public audioElement!: HTMLAudioElement;
  public audioSource!: MediaElementAudioSourceNode;
  public splitter!: ChannelSplitterNode;
  public merger!: ChannelMergerNode;
  public audioOutputDevices: Array<MediaDeviceInfo> = [];
  public selectedDeviceId!: string;
  public audioStream!: MediaStream;
  public isTestingMode = false;
  constructor(private browserService: BrowserService) {

  }
  ngOnInit(): void {
    if (!this.browserService.isBrowser()) return;
    if (!this.isTestingMode) return;
    this.initializeAudioContext();
    this.getAudioOutputDevices();
  }

  playSound(item?: 'LEFT' | 'RIGHT'): void {
    console.log("Audio context : ", this.audioContext);
    if (!this.audioContext) {
      this.initializeAudioContext();
    }
    // Reset the connections
    this.splitter.disconnect();
    this.splitter.connect(this.merger, 0, 0); // Left channel to left speaker
    this.splitter.connect(this.merger, 1, 1); // Right channel to right speaker

    if (item === 'LEFT') {
      this.splitter.disconnect(1);
    } else if (item === 'RIGHT') {
      this.splitter.disconnect(0);
    }
    this.audioElement.play().then(() => { console.log("Audio Played!") }).catch(err => console.error('Error playing audio:', err));
  }
  async requestPermissions(): Promise<void> {
    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Stream ", this.audioStream);
    } catch (err) {
      console.error('Error getting audio output devices: ', err);
    }
  }
  async getAudioOutputDevices() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      console.log("Audio Input DEVICES : ", devices.filter(i => i.kind === 'audioinput'));
      console.log("Audio Output DEVICES : ", devices.filter(i => i.kind === 'audiooutput'));
      console.log("Video DEVICES : ", devices.filter(i => i.kind === 'videoinput'));
      if (devices && devices.length) {
        this.audioOutputDevices = devices.filter(i => i.kind === 'audiooutput');
      }
    } catch (err) {
      console.error('Error getting audio output devices: ', err);
    }
  }
  private initializeAudioContext(): void {
    if (this.audioContext) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.audioElement = this.audioPlayer.nativeElement as HTMLAudioElement;
    this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
    this.splitter = this.audioContext.createChannelSplitter(2);
    this.merger = this.audioContext.createChannelMerger(2);

    this.audioSource.connect(this.splitter);
    // Left channel to left speaker
    this.splitter.connect(this.merger, 0, 0);
    // Right channel to right speaker
    this.splitter.connect(this.merger, 1, 1);

    this.merger.connect(this.audioContext.destination);
  }
  async onDeviceChange(): Promise<void> {
    if ('setSinkId' in this.audioElement) {
      try {
        this.audioElement.load();
        await this.audioElement.setSinkId(this.selectedDeviceId);
        console.log(`Audio output device sink ID is ${this.selectedDeviceId}`);
      } catch (error) {
        console.error(`Error setting sink ID: ${error}`);
      }
    } else {
      alert('Browser does not support output device selection.');
    }
  }

  onMouseDown(event: MouseEvent, item: 'LEFT' | 'RIGHT'): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('active');
    this.playSound(item);
  }

  removeClass(event: MouseEvent): void {
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('active');
  }
  startTesting(): void {
    this.isTestingMode = true;
  }

}
