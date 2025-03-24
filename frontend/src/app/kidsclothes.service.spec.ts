import { TestBed } from '@angular/core/testing';

import { KidsclothesService } from './kidsclothes.service';

describe('KidsclothesService', () => {
  let service: KidsclothesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidsclothesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
