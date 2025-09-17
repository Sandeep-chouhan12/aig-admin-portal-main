import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminListComponent } from './sub-admin-list.component';

describe('SubAdminListComponent', () => {
  let component: SubAdminListComponent;
  let fixture: ComponentFixture<SubAdminListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubAdminListComponent]
    });
    fixture = TestBed.createComponent(SubAdminListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
