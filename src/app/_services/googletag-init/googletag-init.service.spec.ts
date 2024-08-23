import { TestBed } from '@angular/core/testing';

import { GoogletagInitService } from './googletag-init.service';

describe('GoogletagInitService', () => {
  let service: GoogletagInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogletagInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
