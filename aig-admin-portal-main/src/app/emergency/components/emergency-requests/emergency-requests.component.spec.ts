import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyRequestsComponent } from './emergency-requests.component';

describe('EmergencyRequestsComponent', () => {
  let component: EmergencyRequestsComponent;
  let fixture: ComponentFixture<EmergencyRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmergencyRequestsComponent]
    });
    fixture = TestBed.createComponent(EmergencyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
