import { Component, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { AreaChart } from 'src/app/shared/charts/area-chart';
import { ColumnChart } from 'src/app/shared/charts/column';
import { LineChart } from 'src/app/shared/charts/line-chart';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { Constants } from 'src/app/shared/utils/constants';
import { ApiUsersService } from '../../services/api-users.service';
import { User } from 'src/app/users/models/user';
import { ApiRoutes } from 'src/app/shared/utils/api-routes';
import { UserResponse } from '../../models/user-response';
import { AppUtil } from 'src/app/shared/utils/app-util';
import { ComponentsRoutes } from 'src/app/shared/utils/components-routes';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/services/users.service';
import { UpdateUserStatusRequest } from '../../payloads/UpdateUserStatusRequest';

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
  colors: any;
  labels: any;
  responsive: any;
  grid: any;
  subtitle: any;
  title: any;
  markers: any;
};

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  providers: [NumberFormatPipe]
})
export class AnalyticsComponent {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public apiDocUserGraph: Partial<ChartOptions> | undefined;
  public apiCallSummary: Partial<ChartOptions> | undefined;
  numberFormat = new NumberFormatPipe();
  apiuserGraph = new LineChart();
  userGraph = new LineChart();
  constants = Constants;
  appUtil= AppUtil
  topCollaborators: User[] = [];
  componentsRoutes = ComponentsRoutes
  updateUserStatusRequest: UpdateUserStatusRequest = new UpdateUserStatusRequest();
  constructor(private apiUserService: ApiUsersService,private router:Router,private userService: UsersService) {

    this.apiCallSummaryGraphConfiguration();
    this.apiUserGraphConfiguration();

  }

  ngOnInit(): void {
    this.getApiDocUserAcquition(-1);
    this.getApiCallSummary(-1);
    this.getTopCollaborators();
  }


  public apiCallSummaryGraphConfiguration() {

    this.apiCallSummary = this.apiuserGraph.chartOptions
    this.apiCallSummary.series = [
      {
        name: "AddressDetails",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 110],
      },
      {
        name: "BlockCodeToCoordinates",
        data: [41, 148, 35, 62, 69, 51, 49, 91, 10],
      },
      {
        name: "CoordinatesToBlockCode",
        data: [35, 51, 49, 62, 10, 41, 69, 91, 148],
      },
    ],
      this.apiCallSummary.colors = ["#174EA0", "#949495", "#F40000"]
    this.apiCallSummary.markers = {
      size: 5,
      colors: ["#ffffff", "#ffffff", "#ffffff"], // Set the colors for the initial blue and white point
      strokeColors: ["#174EA0", "#949495", "#F40000"], // Set the stroke colors for the white and blue point
      strokeWidth: 3, // Set the stroke width for the points
    }
  }


  public apiUserGraphConfiguration() {
    this.apiDocUserGraph = this.userGraph.chartOptions;
  }

  public getApiDocUserAcquition(key: any) {
    this.apiUserService.getApiDocUserAcquition(key).subscribe({
      next: (res: any) => {
        this.apiDocUserGraph!.series = [
          {
            name: "Users",
            data: res.series.activeUsers,
          },
        ],
          this.apiDocUserGraph!.xaxis = {
            categories: res.category
          }
      }, error: (err: any) => {

      }
    })
  }

  public getApiCallSummary(key: any) {
    this.apiUserService.getApiCallSummary(key).subscribe({
      next: (res: any) => {
        this.apiCallSummary!.series = [
          {
            name: "AddressDetails",
            data: res.series.addressDetails,
            // data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
          {
            name: "BlockCodeToCoordinates",
            data: res.series.blockCodeToCoordinates,
            //   data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
          {
            name: "CoordinatesToBlockCode",
            data: res.series.coordinatesToBlockCode,
            //   data: [0,0,0,0,0,0,0,0,0,0,0,0],
          },
        ]

        this.apiCallSummary!.xaxis = {
          categories: res.category
        }
      },
      error: (err: any) => {

      }
    })
  }



  public getTopCollaborators() {
    this.apiUserService.getTopCollaborators().subscribe({
      next: (data: any) => {
        this.topCollaborators = data.collaborators
      },
      error: (er: any) => {

      }
    })
  }

  changeOrganizationStatus(item: any) {
    this.updateUserStatusRequest.organizationId = item.organizationId;
    this.updateUserStatusRequest.userType = item.organizationType;
    this.userService.changeOrganizationStatus(this.updateUserStatusRequest).subscribe({
      next: (response: any) => {
        AppUtil.openToast('success', response.message, 'Success');
      },
      error: (error: any) => {
        //toast.error(error.error.message);
      },
    });
  }
  public navigateToComponent(id: string, organizationType: any): void {
    this.router.navigate([this.componentsRoutes.ORGANIZATION_DETAILS_BASE], {
      queryParams: { id: id,type: organizationType}
    });

}

}
