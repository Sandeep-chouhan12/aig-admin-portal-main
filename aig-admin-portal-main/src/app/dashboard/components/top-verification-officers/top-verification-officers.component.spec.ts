import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopVerificationOfficersComponent } from './top-verification-officers.component';

describe('TopVerificationOfficersComponent', () => {
  let component: TopVerificationOfficersComponent;
  let fixture: ComponentFixture<TopVerificationOfficersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopVerificationOfficersComponent]
    });
    fixture = TestBed.createComponent(TopVerificationOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
