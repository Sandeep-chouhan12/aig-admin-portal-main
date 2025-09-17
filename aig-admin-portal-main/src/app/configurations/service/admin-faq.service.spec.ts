import { TestBed } from '@angular/core/testing';

import { AdminFaqService } from './admin-faq.service';

describe('AdminFaqService', () => {
  let service: AdminFaqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFaqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
