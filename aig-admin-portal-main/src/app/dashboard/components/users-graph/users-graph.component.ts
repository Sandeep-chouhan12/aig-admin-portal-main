import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { LineChart } from 'src/app/shared/charts/line-chart';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { Constants } from 'src/app/shared/utils/constants';
import { ChartOptions } from 'src/app/users/components/user-analytics/user-analytics.component';
import { UserAnalyticsService } from 'src/app/users/services/user-analytics.service';

export type LineChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  dataLabels: any;
  grid: any;
  stroke: any;
  title: any;
  colors: any;
  tooltip: any;
  legend: any;
  markers: any;
};

@Component({
  selector: 'app-users-graph',
  templateUrl: './users-graph.component.html',
  styleUrls: ['./users-graph.component.scss']
})
export class UsersGraphComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public userGraphAcquition: Partial<ChartOptions> | undefined;
  lineChart = new LineChart();
  constants = Constants;

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.userGraphAcquition = this.lineChart.chartOptions
  }
  ngOnInit(): void {
    this.getUserAcquition(-1);
  }

  public getUserAcquition(month: any) {
    this.userAnalyticsService.getUserAcquition(month).subscribe({
      next: (data: any) => {
        if (this.userGraphAcquition) {
          this.userGraphAcquition.series = [
            {
              name: "Users",
              data: data.series.totalUser,
            },
          ],
            this.userGraphAcquition.xaxis = {
              categories: data.category
            }
        }
      }, error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    })
  }

}
