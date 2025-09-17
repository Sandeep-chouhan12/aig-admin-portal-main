import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOfficerDetailsComponent } from './verification-officer-details.component';

describe('VerificationOfficerDetailsComponent', () => {
  let component: VerificationOfficerDetailsComponent;
  let fixture: ComponentFixture<VerificationOfficerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOfficerDetailsComponent]
    });
    fixture = TestBed.createComponent(VerificationOfficerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
