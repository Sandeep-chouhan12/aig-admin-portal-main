import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRequestChartComponent } from './api-request-chart.component';

describe('ApiRequestChartComponent', () => {
  let component: ApiRequestChartComponent;
  let fixture: ComponentFixture<ApiRequestChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiRequestChartComponent]
    });
    fixture = TestBed.createComponent(ApiRequestChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
