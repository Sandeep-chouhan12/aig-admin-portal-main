import { TestBed } from '@angular/core/testing';

import { TermsPolicyService } from './terms-policy.service';

describe('TermsPolicyService', () => {
  let service: TermsPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermsPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
