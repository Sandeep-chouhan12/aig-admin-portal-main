import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressVerificationRequestsComponent } from './address-verification-requests.component';

describe('AddressVerificationRequestsComponent', () => {
  let component: AddressVerificationRequestsComponent;
  let fixture: ComponentFixture<AddressVerificationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressVerificationRequestsComponent]
    });
    fixture = TestBed.createComponent(AddressVerificationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
