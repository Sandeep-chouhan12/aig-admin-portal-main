import { TestBed } from '@angular/core/testing';

import { VerificationOfficerService } from './verification-officer.service';

describe('VerificationOfficerService', () => {
  let service: VerificationOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificationOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
