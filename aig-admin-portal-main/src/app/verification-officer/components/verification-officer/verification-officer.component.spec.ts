import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationOfficerComponent } from './verification-officer.component';

describe('VerificationOfficerComponent', () => {
  let component: VerificationOfficerComponent;
  let fixture: ComponentFixture<VerificationOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificationOfficerComponent]
    });
    fixture = TestBed.createComponent(VerificationOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
