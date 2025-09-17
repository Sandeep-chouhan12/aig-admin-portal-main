import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';


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
  selector: 'app-report-api-bar-chart',
  templateUrl: './report-api-bar-chart.component.html',
  styleUrls: ['./report-api-bar-chart.component.scss']
})
export class ReportApiBarChartComponent {

 @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        },
      ],
      colors: ["#1A3275"],
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
        height: 300
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
        show: false,
      },
      yaxis: {
        show: false
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " thousands";
          }
        }
      }
    };
  }
}

