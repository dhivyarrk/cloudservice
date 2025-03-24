import { TestBed } from '@angular/core/testing';

import { KidsshoesService } from './kidsshoes.service';

describe('KidsshoesService', () => {
  let service: KidsshoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KidsshoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
