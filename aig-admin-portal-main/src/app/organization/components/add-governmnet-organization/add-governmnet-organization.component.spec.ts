import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGovernmnetOrganizationComponent } from './add-governmnet-organization.component';

describe('AddGovernmnetOrganizationComponent', () => {
  let component: AddGovernmnetOrganizationComponent;
  let fixture: ComponentFixture<AddGovernmnetOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGovernmnetOrganizationComponent]
    });
    fixture = TestBed.createComponent(AddGovernmnetOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
