import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { PieChart } from 'src/app/shared/charts/pie-chart';
import { DashboardService } from '../../services/dashboard.service';
import { Constants } from 'src/app/shared/utils/constants';

export type ChartOptions = {
  series: any;
  chart: any;
  responsive: any;
  labels: any;
  legend: any;
  stroke: any;
  colors: any;
  dataLabels: any;
  fill: any;
  tooltip: any;
  plotOptions: any;
  noData: any;
};

@Component({
  selector: 'app-verification-requests',
  templateUrl: './verification-requests.component.html',
  styleUrls: ['./verification-requests.component.scss'],
})
export class VerificationRequestsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public verificationRequestsChart: Partial<ChartOptions> | undefined;
  pieChart = new PieChart();
  emptyPieCharts = new PieChart();
  @ViewChild('empty-chart') emptyChart: ChartComponent | undefined;
  public emptyPieChart: Partial<ChartOptions> | undefined;

  showEmpty = false;
  constants = Constants;

  constructor(private dashboardService: DashboardService) {
    this.prepareChart();
    this.prepareEmptyPieChart();
  }

  ngOnInit(): void {
    this.getVerificationRequestsStatistics(-1);
  }

  public getVerificationRequestsStatistics(month: any) {
    this.dashboardService.getVerificationStatistics(month).subscribe({
      next: (data: any) => {
        let series = [];
        series.push(data.series.Verified);
        series.push(data.series.Pending);
        series.push(data.series.Rejected);
        if (series[0] == 0 && series[1] == 0 && series[2] == 0) {
          this.showEmpty = true;
        } else {
          this.showEmpty = false;
        }
        if (this.verificationRequestsChart)
          this.verificationRequestsChart.series = series;
      },
      error: (err: any) => {}
    });
  }

  public prepareChart() {
    this.verificationRequestsChart = this.pieChart.chartOptions;
    this.verificationRequestsChart.chart = {
      width: "100%",
      height: 350,
      type: 'pie',
    };
    this.verificationRequestsChart.plotOptions = {
      pie: {
        customScale: 0.7,
      }
    };
    this.verificationRequestsChart.responsive = [
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: {
            fontSize: '14px',
            itemMargin: { horizontal: 10, vertical: 10 }
          }
        }
      },
      {
        breakpoint:575, // only on small screens
        options: {
          chart: {
            height: 250, // smaller height on mobile
          },
          plotOptions: {
            pie: {
              customScale: 0.8, // smaller circle
              offsetY: 10,
            }
          },
          legend: {
            fontSize: '12px',
            itemMargin: { horizontal: 5, vertical: 5 }
          }
        }
      }
    ];
    this.verificationRequestsChart.legend = {
      show: true,
      floating: false,
      fontSize: '18px',
      fontFamily: 'outfit',
      fontWeight: 600,
      position: 'bottom',
      offsetX: -20,
      offsetY: 10,
      itemMargin: {
        horizontal: 20,
        vertical: 15,
      },
      formatter: function (seriesName: any, opts: any) {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `<div>${seriesName}</div><div style="font-size: 100%; text-align:center">${value}</div>`;
      },
      labels: {
        colors: ['#000', '#000', '#000'],
        useSeriesColors: false
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -5,
        offsetY: -8
      },
    };
  }

  public prepareEmptyPieChart() {
    this.emptyPieChart = this.emptyPieCharts.chartOptions;
    this.emptyPieChart.chart = {
      width: "100%",
      height: 350,
      type: 'pie',
    };
    this.emptyPieChart.plotOptions = {
      pie: {
        customScale: 0.7,
        dataLabels: {
          offset: 0,
        },
        states: {
          hover: {
            enabled: false,
            color: '#999',
          },
        },
      }
    };
    this.emptyPieChart.tooltip = {
      enabled: false,
    };
    this.emptyPieChart.responsive = [
      {
        breakpoint: 768,
        options: {
          chart: { width: "100%" },
          legend: {
            fontSize: '14px',
            itemMargin: { horizontal: 10, vertical: 10 }
          }
        }
      },
      {
        breakpoint: 575,
        options: {
          chart: {
            height: 250,
          },
          plotOptions: {
            pie: {
              customScale: 0.8,
              offsetY: 10,
            }
          },
          legend: {
            fontSize: '12px',
            itemMargin: { horizontal: 5, vertical: 5 }
          }
        }
      }
    ];
    let series = [];
    series.push(0);
    series.push(0);
    series.push(100);
    this.emptyPieChart.series = series;
    this.emptyPieChart.colors = ['#1f3778', '#bbccfa', '#b4b4b447'];
    this.emptyPieChart.legend = {
      show: true,
      floating: false,
      fontSize: '18px',
      fontFamily: 'outfit',
      fontWeight: 600,
      position: 'bottom',
      offsetX: -20,
      offsetY: 10,
      itemMargin: {
        horizontal: 20,
        vertical: 15,
      },
      formatter: function (seriesName: any, opts: any) {
        return `<div>${seriesName}</div><div style="font-size: 100%; text-align:center">0</div>`;
      },
      colors: ['#1f3778', '#bbccfa', '#bbccfa'],
      labels: {
        colors: ['#000', '#000', '#000'],
        useSeriesColors: false,
        names: ["Verified", "Pending", "Rejected"]
      },
      markers: {
        useSeriesColors: false,
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: '#fff',
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -5,
        offsetY: -8,
        fillColors: ['#1f3778', '#bbccfa', '#bcbdbf'],
      },
    };
  }
}
