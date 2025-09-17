import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { ColAreaMixChart } from 'src/app/shared/charts/col-area-mix-chart';
import { LineChart } from 'src/app/shared/charts/line-chart';
import { Constants } from 'src/app/shared/utils/constants';
import { UserAnalyticsService } from '../../services/user-analytics.service';
import { AppUtil } from 'src/app/shared/utils/app-util';
declare var $: any;
export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  labels: any;
  stroke: any;
  markers: any;
  plotOptions: any;
  fill: any;
  tooltip: any;
  legend: any;
  dataLabels: any;
  colors: any;
  responsive: any;
  subtitle: any;
  title: any;
  grid: any
};


@Component({
  selector: 'app-user-analytics',
  templateUrl: './user-analytics.component.html',
  styleUrls: ['./user-analytics.component.scss']
})
export class UserAnalyticsComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public userMixGraph: Partial<ChartOptions> | undefined;
  public userVerificationGraph: Partial<ChartOptions> | undefined;
  public userGraphAcquition: Partial<ChartOptions> | undefined;

  mixedChart = new ColAreaMixChart();
  userAcquition = new LineChart();
  userAddress = new LineChart();

  constants = Constants;

  hideXAxisTooltip() {
    const div: any = document.querySelector(".user-area-graph .apexcharts-xaxistooltip");
    if (div)
      div.style.display = "none";
  }

  showXAxisTooltip() {
    const div: any = document.querySelector(".user-area-graph .apexcharts-xaxistooltip");
    if (div)
      div.style.display = "block";
  }

  constructor(private userAnalyticsService: UserAnalyticsService) {
    this.userMixGraphConfiguration();

    this.userGraphAcquitionConfig();
    this.userAddressGraphConfig();
  }

  ngOnInit(): void {
    this.getUserAcquition(-1);
    this.getAddressStatics(-1);
    this.getVerificationRequests(-1);
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

  public getAddressStatics(month: any) {
    this.userAnalyticsService.getAddressStatics(month).subscribe({
      next: (data: any) => {
        if (this.userMixGraph) {
          this.userMixGraph.series = [
            {
              name: "Address",
              type: "column",
              data: data.series.totalAddres,
              colors: ["#000000"],
            },
            {
              name: "Address",
              type: "area",
              data: data.series.totalAddres,
            },
          ],
            this.userMixGraph.xaxis = {
              categories: data.category
            }
        }

      }, error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    })
  }

  public getVerificationRequests(month: any) {
    this.userAnalyticsService.getVerifiedRequestRaised(month).subscribe({
      next: (data: any) => {

        if (this.userVerificationGraph) {
          this.userVerificationGraph.series = [
            {
              name: "Verified",
              data: data.series.verified
            },
            {
              name: "Pending",
              data: data.series.pending
            },
            {
              name: "Rejected",
              data: data.series.rejected
            },
          ]

          this.userVerificationGraph.xaxis = {
            categories: data.category
          }
        }

      }, error: (err: any) => {
        AppUtil.openToast('error', err.error.message, 'Error');
      }
    })
  }


  public userMixGraphConfiguration() {
    this.userMixGraph = this.mixedChart.chartOptions;
  }

  public userGraphAcquitionConfig() {
    this.userGraphAcquition = this.userAcquition.chartOptions
  }

  public userAddressGraphConfig() {
    this.userVerificationGraph = this.userAddress.chartOptions
    this.userVerificationGraph.series = [
      {
        name: "Verified",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: "Pending",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: "Rejected",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
    ],
      this.userVerificationGraph.colors = ["#174EA0", "#949495", "#F40000"]
    this.userVerificationGraph.markers = {
      size: 5,
      colors: ["#ffffff", "#ffffff", "#ffffff"], // Set the colors for the initial blue and white point
      strokeColors: ["#174EA0", "#949495", "#F40000"], // Set the stroke colors for the white and blue point
      strokeWidth: 3, // Set the stroke width for the points
    }
  }


}
