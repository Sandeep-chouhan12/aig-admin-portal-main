import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOrganizationProfileComponent } from './private-organization-profile.component';

describe('PrivateOrganizationProfileComponent', () => {
  let component: PrivateOrganizationProfileComponent;
  let fixture: ComponentFixture<PrivateOrganizationProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateOrganizationProfileComponent]
    });
    fixture = TestBed.createComponent(PrivateOrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
