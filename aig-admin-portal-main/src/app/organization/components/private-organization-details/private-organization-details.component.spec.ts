import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateOrganizationDetailsComponent } from './private-organization-details.component';

describe('PrivateOrganizationDetailsComponent', () => {
  let component: PrivateOrganizationDetailsComponent;
  let fixture: ComponentFixture<PrivateOrganizationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateOrganizationDetailsComponent]
    });
    fixture = TestBed.createComponent(PrivateOrganizationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
