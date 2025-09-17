import { Component, Input, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { UserSettings } from 'src/app/users/models/user-settings';
import { UsersService } from 'src/app/users/services/users.service';


export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  yaxis: any;
  xaxis: any;
  fill: any;
  tooltip: any;
  stroke: any;
  legend: any;
  grid: any;
  colors: any;
};
@Component({
  selector: 'app-api-request-chart',
  templateUrl: './api-request-chart.component.html',
  styleUrls: ['./api-request-chart.component.scss']
})
export class ApiRequestChartComponent {
  @Input() userId!: any;
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  constructor(private userService: UsersService) {
    this.chartOptions = {
      series: [
        {
          name: "Requests",
          data: [44, 45, 46, 47, 48]
        },
      ],
      colors: ["#174ea0"],
      grid: {
        strokeDashArray: 7,
        yaxis: {
          lines: {
            show: true
          }
        }
      },
      chart: {
        zoom: {
          enabled: false,
          allowMouseWheelZoom: false,

        },
        toolbar: {
          show: false
        },
        type: "bar",
        height: 350,
        width: "100%"
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          borderRadiusApplication: 'end',
          horizontal: false,
          columnWidth: "55%",
        }
      }
      ,
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: ["", "", "", "", "", ""],
        title: {
          text: "Endpoints",
        },
        show: false
      },
      yaxis: {
        title: {
          text: "No. of Api Requests"
        },
        show: true
      },
      fill: {
        opacity: 1
      },
    };
  }
  ngAfterViewInit(): void {
    this.getApiRequestAnalytics()
  }

  public getApiRequestAnalytics() {
    this.userService.getApiRequestAnalytics(this.userId).subscribe({
      next: (data: any) => {
    
        this.chartOptions.series = [
          {
            name: "requests",
            data: Object.values(data)
          },
        ]

        this.chartOptions.xaxis = {
          categories: Object.keys(data),
          title: {
            text: "Endpoints",
          },
          show: false
        }

      }
    })
  }
}
