import { TestBed } from '@angular/core/testing';

import { UserAnalyticsService } from './user-analytics.service';

describe('UserAnalyticsService', () => {
  let service: UserAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
