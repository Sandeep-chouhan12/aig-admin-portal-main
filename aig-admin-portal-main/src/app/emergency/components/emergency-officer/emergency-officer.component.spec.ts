import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyOfficerComponent } from './emergency-officer.component';

describe('EmergencyOfficerComponent', () => {
  let component: EmergencyOfficerComponent;
  let fixture: ComponentFixture<EmergencyOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyOfficerComponent]
    });
    fixture = TestBed.createComponent(EmergencyOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
