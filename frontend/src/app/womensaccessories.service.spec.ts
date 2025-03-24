import { TestBed } from '@angular/core/testing';

import { WomensaccessoriesService } from './womensaccessories.service';

describe('WomensaccessoriesService', () => {
  let service: WomensaccessoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WomensaccessoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
