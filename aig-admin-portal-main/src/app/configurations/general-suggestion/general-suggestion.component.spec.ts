import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSuggestionComponent } from './general-suggestion.component';

describe('GeneralSuggestionComponent', () => {
  let component: GeneralSuggestionComponent;
  let fixture: ComponentFixture<GeneralSuggestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralSuggestionComponent]
    });
    fixture = TestBed.createComponent(GeneralSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
