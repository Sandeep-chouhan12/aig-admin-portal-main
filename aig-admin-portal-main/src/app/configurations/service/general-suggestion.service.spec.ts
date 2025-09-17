import { TestBed } from '@angular/core/testing';

import { GeneralSuggestionService } from './general-suggestion.service';

describe('GeneralSuggestionService', () => {
  let service: GeneralSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
