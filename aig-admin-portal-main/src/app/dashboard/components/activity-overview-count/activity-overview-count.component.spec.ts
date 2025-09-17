import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOverviewCountComponent } from './activity-overview-count.component';

describe('ActivityOverviewCountComponent', () => {
  let component: ActivityOverviewCountComponent;
  let fixture: ComponentFixture<ActivityOverviewCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityOverviewCountComponent]
    });
    fixture = TestBed.createComponent(ActivityOverviewCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
