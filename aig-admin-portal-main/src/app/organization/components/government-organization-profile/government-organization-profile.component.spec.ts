import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernmentOrganizationProfileComponent } from './government-organization-profile.component';

describe('GovernmentOrganizationProfileComponent', () => {
  let component: GovernmentOrganizationProfileComponent;
  let fixture: ComponentFixture<GovernmentOrganizationProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GovernmentOrganizationProfileComponent]
    });
    fixture = TestBed.createComponent(GovernmentOrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
