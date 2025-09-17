import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApiBarChartComponent } from './report-api-bar-chart.component';

describe('ReportApiBarChartComponent', () => {
  let component: ReportApiBarChartComponent;
  let fixture: ComponentFixture<ReportApiBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportApiBarChartComponent]
    });
    fixture = TestBed.createComponent(ReportApiBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
