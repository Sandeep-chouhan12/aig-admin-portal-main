import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AreaChart } from 'src/app/shared/charts/area-chart';
import { DashboardService } from '../../services/dashboard.service';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  yaxis: any;
  stroke: any;
  tooltip: any;
  dataLabels: any;
  colors: any;
  grid: any;
  labels: any;
  legend: any;
};

@Component({
  selector: 'app-address-management',
  templateUrl: './address-management.component.html',
  styleUrls: ['./address-management.component.scss']
})
export class AddressManagementComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public verifiedChart: Partial<ChartOptions> | undefined;
  public pendingChart: Partial<ChartOptions> | undefined;

  verifyGraph = new AreaChart();
  pendingGraph = new AreaChart();
  totalPending: number = 0;
  totalVerified: number = 0;

  constructor(private dashBoardService: DashboardService) {
    this.verifiedAddressAreaGraphConfig();
    this.pendingAddressAreaGraphConfig();
  }
  ngOnInit(): void {
    this.getAllPendingAndVerifiedAddressStatis();
  }

  public verifiedAddressAreaGraphConfig() {
    this.verifiedChart = this.verifyGraph.chartOptions;
    this.verifiedChart.xaxis = {
      labels: {
        show: false,
      },
    },
      this.verifiedChart.yaxis = {
        labels: {
          show: false,
        },
      }
    this.verifiedChart.grid = {
      yaxis: {
        lines: {
          show: false, // Set this to false to hide horizontal grid lines
        },
      },
    }
    this.verifiedChart.chart = {
      type: "area",
      height: 110,
      width: "100%",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
      this.verifiedChart.stroke = {
        width: 2,
        curve: 'straight',
      }
    this.verifiedChart.tooltip = {
      enabled: false
    }
  }

  public pendingAddressAreaGraphConfig() {
    this.pendingChart = this.pendingGraph.chartOptions;
    this.pendingChart.xaxis = {
      labels: {
        show: false,
      },
    },
      this.pendingChart.yaxis = {
        labels: {
          show: false,
        },
      }
    this.pendingChart.grid = {
      yaxis: {
        lines: {
          show: false, // Set this to false to hide horizontal grid lines
        },
      },
    }
    this.pendingChart.chart = {
      type: "area",
      height: 110,
      width: "100%",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    }
    this.pendingChart.colors = ['#FFBE98'],
      this.pendingChart.stroke = {
        width: 2,
        curve: 'straight',
      }
    this.pendingChart.tooltip = {
      enabled: false
    }
  }

  public getAllPendingAndVerifiedAddressStatis() {
    this.dashBoardService.getAllPendingAndVerifiedAddressStatis().subscribe({
      next: (data: any) => {
        this.totalPending = data.totalPending
        this.totalVerified = data.totalVerified
        this.verifiedChart!.series = [
          {
            name: 'Verified',
            data: data.verified,
          }
        ];
        this.pendingChart!.series = [
          {
            name: 'Pending',
            data: data.pending,
          }
        ];
      },
      error: (er: any) => {

      }
    })
  }
}
