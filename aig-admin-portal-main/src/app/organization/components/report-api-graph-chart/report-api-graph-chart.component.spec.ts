import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportApiGraphChartComponent } from './report-api-graph-chart.component';

describe('ReportApiGraphChartComponent', () => {
  let component: ReportApiGraphChartComponent;
  let fixture: ComponentFixture<ReportApiGraphChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportApiGraphChartComponent]
    });
    fixture = TestBed.createComponent(ReportApiGraphChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
