import { TestBed } from '@angular/core/testing';

import { PartersService } from './partner.service';

describe('PartersService', () => {
  let service: PartersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
