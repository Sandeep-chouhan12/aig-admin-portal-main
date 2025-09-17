import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserDetailsComponent } from './api-user-details.component';

describe('ApiUserDetailsComponent', () => {
  let component: ApiUserDetailsComponent;
  let fixture: ComponentFixture<ApiUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiUserDetailsComponent]
    });
    fixture = TestBed.createComponent(ApiUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
