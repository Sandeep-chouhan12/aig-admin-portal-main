import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  stroke: any;
  tooltip: any;
  dataLabels: any;
  colors: any;
  yaxis: any;
};
@Component({
  selector: 'app-report-api-graph-chart',
  templateUrl: './report-api-graph-chart.component.html',
  styleUrls: ['./report-api-graph-chart.component.scss']
})
export class ReportApiGraphChartComponent {

@ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100, 31, 40, 28, 51, 42]
        },
      ],
      chart: {
      zoom: {
          enabled: false,
          allowMouseWheelZoom: false,  
       
      },
        toolbar: {
          show: false
        },
        height: 300,
        type: "area"
      },
      colors: ["#1A3275"],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
      },
      yaxis: {
        lines: {
          show: false,
        },
        show: false
      },
      // fill: {
      //   opacity: 1
      // },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  // public generateData(baseval: any, count: any, yrange: any) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
  //     var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

  //     series.push([x, y, z]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }

}

