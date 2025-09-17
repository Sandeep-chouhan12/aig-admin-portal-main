import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AreaChart } from 'src/app/shared/charts/area-chart';
import { PieChart } from 'src/app/shared/charts/pie-chart';
import { StrackChart } from 'src/app/shared/charts/strack-chart';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { VerificationOfficerService } from '../../services/verification-officer.service';
import { ReportStatisticsRequest } from '../../payload/report-statistics-request';
import { Constants } from 'src/app/shared/utils/constants';
import { LineChart } from 'src/app/shared/charts/line-chart';
import { RedialChart } from 'src/app/shared/charts/redial-chart';
import { VerificationOfficer } from '../../models/verification-officer';
import { PageRequest } from 'src/app/shared/models/page-request';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
export type ChartOptions = {
  series: any;
  chart: any;
  dataLabels: any;
  plotOptions: any;
  responsive: any;
  xaxis: any;
  legend: any;
  fill: any;
  colors: any;
  stroke: any;
  labels: any;
  yaxis: any;
  grid: any;
  markers: any;
  tooltip: any;
  title: any;
  rawData: any;
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public verificationOptions: Partial<ChartOptions> | undefined;
  public pieChartOptions: Partial<ChartOptions> | undefined;
  public areaOptions: Partial<ChartOptions> | undefined;
  public officerAcquition: Partial<ChartOptions> | undefined;
  public officerRedialGraph: Partial<ChartOptions> | undefined;

  constants = Constants;
  verificationGraph = new StrackChart();
  pieGraph = new PieChart();
  areaGraph = new AreaChart();
  officerAcquitionGraph = new LineChart();
  officerRedial = new RedialChart();
  pageRequest = new PageRequest();
  defaultImage = AppUtil.DEFAULT_IMAGE;
  public staticsRequestBar: ReportStatisticsRequest =
    new ReportStatisticsRequest();

  public staticsRequestArea: ReportStatisticsRequest =
    new ReportStatisticsRequest();

  months: string[] = AppUtil.months;
  topVerificationOfficers: VerificationOfficer[] = [];
  constructor(
    private verificationOfficerService: VerificationOfficerService,
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.pieChartConfiguration();
    this.areaChartConfiguration();
    this.verificationOfficerAcquitionConfig();
    // this.officerRedialGraphConfiguration();
    this.officerRedialGraph = {
      series: [], // will be filled by API
      chart: {
        height: 400, // ✅ Increased for desktop
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '50%',
          },
          track: {
            margin: 10, // spacing between tracks
          },
          dataLabels: {
            show: true,
            name: {
              fontSize: '20px', // ✅ Desktop font size
            },
            value: {
              fontSize: '14px', // Keep as is or increase if needed
            },
          },
        },
      },
      labels: ['Verified', 'Pending', 'Rejected'],
      colors: ['#102e67', '#8da8f4', '#ffa3a3'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        itemMargin: {
          horizontal: 12,
          vertical: 5,
        },
        markers: {
          radius: 4,
        },
      },
      responsive: [
        {
          breakpoint: 1100, // ✅ For screens <= 1100px
          options: {
            chart: {
              height: 350, // Slightly smaller
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: '16px', // ✅ Smaller name font
                  },
                  value: {
                    fontSize: '12px', // ✅ Smaller value font
                  },
                },
              },
            },
          },
        },
        {
          breakpoint: 575, // ✅ Only apply to small screens
          options: {
            chart: {
              height: 320, // Optional: smaller chart
            },
            plotOptions: {
              radialBar: {
                dataLabels: {
                  name: {
                    fontSize: '16px', // 👈 Smaller label on mobile
                  },
                  value: {
                    fontSize: '12px', // Optional: smaller number
                  },
                },
              },
            },
          },
        },
      ],
    };
    
  }

  ngOnInit(): void {
    this.getAllVerificationRequestsCount();
    this.staticsRequestBar.year = new Date().getFullYear();
    this.staticsRequestBar.month = 0;
    this.staticsRequestArea.month = new Date().getMonth() + 1;
    this.staticsRequestArea.year = this.staticsRequestBar.year;

    this.getVerificationReportStatistics();
    this.getPendingReportStatistics();
    this.getTopVerificationOfficers();
    this.getVerificationOfficerAcquition(-1);
  }

  getYears() {
    return AppUtil.getYearsArray();
  }

  public verificationOfficerAcquitionConfig() {
    this.officerAcquition = this.officerAcquitionGraph.chartOptions;
  }

  public pieChartConfiguration() {
    this.pieChartOptions = this.pieGraph.chartOptions;
    (this.pieChartOptions.chart = {
      width: 600,
      height: 250,
      type: 'donut',
    }),
      (this.pieChartOptions.legend = {
        show: true,
        floating: false,
        fontSize: '20px',
        position: 'right',
        fontFamily: 'outfit',
        fontWeight: 500,
        offsetX: -30,
        offsetY: 20,
        labels: {
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
        formatter: function (seriesName: any, opts: any) {
          var percentageValue = opts.w.globals.seriesPercent[opts.seriesIndex];
          var legendText = `<div style="display: flex; justify-content: space-between; align-items: center;"> 
                              <span>${seriesName}</span> 
                              <span style="margin-left: 50px; font-size: 100%;">${Math.floor(
                                percentageValue > 0 ? percentageValue : 0
                              )}%</span>
                           </div>`;
          return legendText;
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
          offsetX: -20,
          offsetY: 25,
        },
      });
    (this.pieChartOptions.plotOptions = {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'Total Requests',
              fontSize: '14px',
              fontFamily: 'outfit',
              fontWeight: 600,
              color: '#758aa8',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: any, b: any) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    }),
      (this.pieChartOptions.colors = ['#5174d1', '#174EA0', '#fd9292']);
  }

  public areaChartConfiguration() {
    this.areaOptions = this.areaGraph.chartOptions;
    this.areaOptions.stroke = {
      curve: 'smooth',
    };
    (this.areaOptions.colors = ['#1c2a5a']),
      (this.areaOptions.xaxis = {
        type: 'category',
        //  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      });
  }

 public getAllVerificationRequestsCount() {
  this.verificationOfficerService
    .getAllVerificationRequestsCount()
    .subscribe({
      next: (data: any) => {
        let rawData = [
          data.totalRequest.verified,
          data.totalRequest.pending,
          data.totalRequest.rejected,
        ];

        // Calculate the sum of all data points
        let sum = rawData.reduce((acc, val) => acc + val, 0);

        // Normalize and round to 2 decimal places
        let normalizedData = rawData.map(value =>
          Number(((value / sum) * 100).toFixed(2))
        );

        this.officerRedialGraph!.series = normalizedData;
        this.officerRedialGraph!.rawData = rawData;
      },
      error: (err: any) => {},
    });
}


  // This is for reports column chart
  public getVerificationReportStatistics() {
    this.verificationOfficerService
      .getVerificationReportSatistics(this.staticsRequestBar)
      .subscribe({
        next: (data: any) => {
          this.verificationOptions!.xaxis = {
            type: 'category',
            categories: data.category,
          };
          this.verificationOptions!.series = [
            {
              name: 'Verified',
              data: data.series.Verified,
            },
            {
              name: 'Pending',
              data: data.series.Pending,
            },
          ];
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  public setReportStatisticsData(
    month: any = this.staticsRequestBar.month,
    year: any = this.staticsRequestBar.year
  ) {
    this.staticsRequestBar.month = month;
    this.staticsRequestBar.year = year;
    this.getVerificationReportStatistics();
  }

  public setReportStatisticsDataArea(
    month: any = this.staticsRequestArea.month,
    year: any = this.staticsRequestArea.year
  ) {
    this.staticsRequestArea.month = month;
    this.staticsRequestArea.year = year;
    this.getPendingReportStatistics();
  }
  getPendingReportStatistics() {
    this.verificationOfficerService
      .getVerificationReportSatistics(this.staticsRequestArea)
      .subscribe({
        next: (data: any) => {
          this.areaOptions!.series = [
            {
              name: 'Pending',
              data: data.series.Pending,
            },
          ];
          this.areaOptions!.labels = this.makeLabelsArea(data.category);
        },
        error: (err: any) => {
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  makeLabelsArea(category: any[]) {
    let lables: any[] = [];
    category.forEach((c) => {
      lables.push(c + ' ' + this.getMonth(true).slice(0, 3));
    });
    return lables;
  }

  getMonth(isArea: boolean) {
    if (!isArea) {
      if (this.staticsRequestBar.month != 0)
        return AppUtil.months[this.staticsRequestBar.month - 1];
    } else {
      if (this.staticsRequestArea.month != 0)
        return AppUtil.months[this.staticsRequestArea.month - 1];
    }
    return 'Month';
  }

  /**
   * Fetches the top verification officers based on the current page request.
   */
  public getTopVerificationOfficers(): void {
    // Set the page size for the request
    this.pageRequest.pageSize = 15;

    // Call the service to get the top verification officers
    this.dashboardService
      .getTopVerificationOfficers(this.pageRequest)
      .subscribe({
        next: (res: any) => {
          // Update the list of top verification officers with the received data
          this.topVerificationOfficers = res.data;
        },
        error: (err: any) => {
          // Handle error and display a toast notification
          AppUtil.openToast('error', err.error.message, 'Error');
        },
      });
  }

  public navigateToComponent(userId: number) {
    this.router.navigate([
      ComponentsRoutes.ADMIN_HOME +
        '/' +
        ComponentsRoutes.VERI_OFFI_DETAILS_BASE +
        '/' +
        userId,
    ]);
  }

  public getVerificationOfficerAcquition(key: any) {
    this.verificationOfficerService
      .getVerificationOfficerAcquition(key)
      .subscribe({
        next: (res: any) => {
          this.officerAcquitionGraph.chartOptions.series = [
            {
              name: 'Users',
              data: res.series.totalAddres,
            },
          ];

          this.officerAcquitionGraph.chartOptions.xaxis = {
            categories: res.category,
          };
        },
        error: (err: any) => {},
      });
  }
}
