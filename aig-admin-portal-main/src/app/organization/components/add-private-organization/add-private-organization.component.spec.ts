import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrivateOrganizationComponent } from './add-private-organization.component';

describe('AddPrivateOrganizationComponent', () => {
  let component: AddPrivateOrganizationComponent;
  let fixture: ComponentFixture<AddPrivateOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPrivateOrganizationComponent]
    });
    fixture = TestBed.createComponent(AddPrivateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
